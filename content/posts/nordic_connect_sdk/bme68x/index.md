---
title: BME680 Device Driver Out-of-Tree
subTitle: Zephyr v2.3.99, Nordic Connect SDK v2.4.2, BME680
category: Zephyr RTOS
date: 2023-10-19T15:49:07
cover:
---

BME680은 Zephyr-RTOS에서 지원한다. 하지만 사용해보니 아래와 같은 문제점이 있어 Driver를 입맛대로 만들어 보려 한다. nRF52832 기준으로 작성된다.

- 제작한 커스텀 보드에서 BME680이 Load Switch로 제어된다.
  스위치는 gpio-hog 기능으로 POST_KERNEL 타이밍에 output high로 되지만
  Zephyr에서 기본으로 지원하는 BME680의 Sensor Init이 실패한다(I2C Read Device Fail)
- BME680의 기본 Sensor output은 온도,기압,습도,가스다. 특히 가스는 전력소모가 큰데 기존 Driver는 On/Off를 지원하지 않는다.
- 또한 가스데이터를 기반으로 IAQ(Indoor Air Quility), VOC, CO2 등을 Bosch에서 지원하는 [BSEC Library](https://github.com/boschsensortec/Bosch-BSEC2-Library)로 추출하는데 이는 [라이센스](https://www.bosch-sensortec.com/media/boschsensortec/downloads/software/bme688_development_software/2023_04/license_terms_bme688_bme680_bsec.pdf) 때문인지 포함되어 있지 않다.

따라서 기능 요구사항은 다음과 같다.

- BME680 Gas(IAQ, VOC, CO2) 측정 300Hz On/Off
- BME680 T,P,H 측정 3Hz

드라이버 코드는 [bme68x_iaq_driver](https://github.com/bradkim06/bme68x_iaq_driver)에 있다.

> nrf connect sdk v2.5.0에서 지원이 추가되는 것으로 보이지만 rc버전이라 2.4.2버전을 유지하고 참고하여 따로 만든다. [BME680 IAQ Driver Code](https://github.com/nrfconnect/sdk-nrf/tree/main/drivers/sensor/bme68x_iaq)

# Device Driver Out-Of-Tree

Driver는 Zephyr-RTOS에 PR을 할 계획이 없으므로 Out of Tree로 작성한다.

## Build(CMake, Kconfig)

Build를 위한 Basic 구조는 아래와 같다. Drivers 폴더와 library 폴더가 필요하다.

```text title=Driver_Directory_Tree
.(Application Directory)
├── CMakeLists.txt //Drivers module 추가 필요
├── Drivers
│   ├── CMakeLists.txt
│   ├── Kconfig
│   ├── zephyr
│   │   └── module.yml
│   └── bme68x_iaq //bme680 driver
│       └── driver_files...
├── dts
│   └── bindings
│       └── bosch,bme68x-i2c.yaml
└── lib //bosch bsec Library
    ├── bsec
    └── bme68x
```

### Driver Module Zephyr Build에 추가

`zephyr/module.yml`파일로 out-of-tree 구조의 모듈을 추가할 수 있다.

```text title=Drivers/zephyr/module.yml
build:
  cmake: .
  kconfig: Kconfig
```

모듈은 어플리케이션 루트의 `CMakeLists.txt`에서 빌드 시스템에 추가된다. zephyr package를 불러오기 전에 추가해야 된다.

```cmake title=CMakeLists.txt
set(APP_ROOT ${CMAKE_SOURCE_DIR})
list(APPEND ZEPHYR_EXTRA_MODULES
  ${APP_ROOT}/drivers
)
find_package(Zephyr 3.3.99 EXACT)
```

### Kconfig

모듈이 추가되었으므로 Drivers 폴더부터 Kconfig를 작성해 나간다.
Drivers 하위 폴더(bme68x_iaq)에 드라이버 코드들을 구현할 생각이므로 는 다음과 같이 된다.

> 작성하는 방법은 Zephyr나 Linux Document에 잘 설명되어 있으므로 참고하기 바란다.

```text title=Drivers/Kconfig
rsource "bme68x_iaq/Kconfig"
```

```text title=Drivers/bme68x_iaq/Kconfig
config BME68X
	bool "BME68X sensor"
	default n
	depends on DT_HAS_BOSCH_BME68X_ENABLED
	select I2C if $(dt_compat_on_bus,$(DT_COMPAT_BOSCH_BME68X),i2c)
	help
	  Enable driver for BME68X I2C- or SPI- based temperature, pressure, humidity and gas sensor.

config BME68X_IAQ
	bool "Use Bosch BSEC library"
	depends on SETTINGS && !SETTINGS_NONE
	depends on BME68X
	help
	  Enable the use of Bosch BSEC library.
	  This configuration depends on the BME680 Zephyr driver being disabled.

if BME68X

config BME68X_IAQ_SAVE_INTERVAL_MINUTES
	int "Period in minutes after which BSEC state is saved to flash"
	default 60

config BME68X_IAQ_THREAD_STACK_SIZE
	int "BSEC thread stack size"
	default 4096

config BME68X_IAQ_EXPECTED_AMBIENT_TEMP
	int "Expected ambient temperature in C"
	default 25

config BME68X_IAQ_TEMPERATURE_OFFSET
	int "BSEC temperature offset in centidegrees"
	default 200
	help
	  BSEC temperature offset. To account for external heat sources on the board.
	  The actual value is divided by 100. This is due to the Kconfig parser
	  not supporting floating point types.
	  The default value 200 is translated to 2.0 degrees celsius offset.

module = BME68X
module-str = BME68X
source "subsys/logging/Kconfig.template.log_config"

endif # BME68X
```

### CMake

Drivers는 실제 드라이버 코드가 없으므로 Kconfig 옵션이 enable되면 하위 폴더를 추가하도록 한다.

```cmake title=Drivers/CMakeLists.txt
add_subdirectory_ifdef(CONFIG_BME68X bme68x_iaq)
```

실제 Driver 코드는 bosch의 라이브러리를 사용하므로 build 시스템에 아래와 같이 추가한다.
라이브러리는 두가지가 포함된다. [Bosch-BME68x-Library](https://github.com/boschsensortec/Bosch-BME68x-Library), [BSEC Library](https://github.com/boschsensortec/Bosch-BSEC2-Library)

> nordic v2.5.0-rc1과 차이점으로 SAMPLE_RATE T,P,H와 Gas를 구분하고 Cortex-m33를 제거했다.

```cmake title=Drivers/bme68x_iaq/CMakeLists.txt
zephyr_library()
zephyr_library_include_directories(${APP_ROOT}/lib/bsec/src/inc)
zephyr_library_include_directories(${APP_ROOT}/lib/bme68x/src/bme68x)
zephyr_library_sources(${APP_ROOT}/lib/bme68x/src/bme68x/bme68x.c)

zephyr_library_compile_definitions(
  BSEC_SAMPLE_RATE=BSEC_SAMPLE_RATE_LP
  BSEC_SAMPLE_RATE_IAQ=BSEC_SAMPLE_RATE_ULP
  BSEC_SAMPLE_PERIOD_S=3
)

if (CONFIG_FP_HARDABI)
  if (CONFIG_CPU_CORTEX_M4)
    zephyr_library_import(bsec_lib ${APP_ROOT}/lib/bsec/src/cortex-m4/fpv4-sp-d16-hard/libalgobsec.a)
  else()
    assert(0 "Unsupported configuration.")
  endif()
else()
  zephyr_library_compile_definitions(BME68X_DO_NOT_USE_FPU)
  if (CONFIG_CPU_CORTEX_M4)
    zephyr_library_import(bsec_lib ${APP_ROOT}/lib/bsec/src/cortex-m4/libalgobsec.a)
  else()
    assert(0 "Unsupported configuration.")
  endif()
endif()

zephyr_library_sources(bme68x_iaq.c)
```

## Devicd Tree 작성

### bindings

ncs는 compatible을 bosch,bme680을 사용하고 kernel의 CONFIG_BME680을 "n"으로 설정해야 가능하다. 굳이 이렇게 할 필요가 있나 싶어 compatible을 bosch,bme68x로 새로 생성한다.

```text title=dts/bindings/bosch,bme68x-i2c.yaml lineNumbers=true {5}
description: |
    The BME680 is an integrated environmental sensor that measures
    temperature, pressure, humidity and air quality

compatible: "bosch,bme68x"

include: [sensor-device.yaml, i2c-device.yaml]
```

### device tree script

device tree를 작성한다. 내 경우는 Board도 Out of Tree로 되어있어서 다음과 같다.

```text title=boards/arm/hhs_nrf52832/hhs_nrf52832.dts lineNumbers=true {10-15}
i2c: &i2c0 {
	compatible = "nordic,nrf-twim";
	status = "okay";
	clock-frequency = <I2C_BITRATE_FAST>;

	pinctrl-0 = <&i2c0_default>;
	pinctrl-1 = <&i2c0_sleep>;
	pinctrl-names = "default", "sleep";

	bme68x:bme68x@76 {
		compatible = "bosch,bme68x";
		status = "okay";
		friendly-name = "bosch environment sensor";
		reg = <0x76>;
	};
};
```

## Device Driver Code 작성

[Zephyr RTOS Device Driver 분석](https://bradkim06.github.io/nordic_connect_sdk/device_driver/)에서 봤듯이 드라이버 코드의 작성이 필요하다. 드라이버 코드 구조와 상세 분석은 생략한다.

### Sensor Channel 추가 Header file

Zephyr에 없는 SENSOR CHANNEL IAQ를 추가로 생성한다.

```c title=include/drivers/bme68x_iaq.h
/*
 * Copyright (c) 2023 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-5-Clause
 */

#ifndef _BME68X_NCS_H_
#define _BME68X_NCS_H_

/**
 * @file bme68x_iaq.h
 *
 * @brief Public API for the bme68x driver.
 */

#ifdef __cplusplus
extern "C" {
#endif

#define SENSOR_CHAN_IAQ (SENSOR_CHAN_PRIV_START + 1)

#ifdef __cplusplus
}
#endif

#endif /* _BME68X_NCS_H_ */
```

### Driver Header

기존 ncs driver 코드에서 IAQ accuracy, co2, voc를 추가했다 (line 21 ~ 29).

```c title=Drivers/bme68x_iaq/bme68x_iaq.h lineNumbers=true {21-29}
/*
 * Copyright (c) 2023 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-5-Clause
 */

/* NCS Integration for BME68X + BSEC */

#include <zephyr/kernel.h>
#include "bsec_interface.h"
#include "bme68x.h"
#include <drivers/bme68x_iaq.h>

#ifndef ZEPHYR_DRIVERS_SENSOR_BME68X_NCS
#define ZEPHYR_DRIVERS_SENSOR_BME68X_NCS

struct bme_sample_result {
	double temperature;
	double humidity;
	double pressure;
#if defined(CONFIG_BME68X_IAQ)
	// Indoor-air-quality (IAQ)
	/* arr[0] : iaq value, arr[1] : iaq accuracy */
	uint16_t air_quality[2];
	// Estimation of the CO2 level in ppm
	double eCO2;
	// Conversion into breath-VOC equivalents in ppm concentration
	double breathVOC;
#endif
};

struct bme68x_iaq_config {
	const struct i2c_dt_spec i2c;
};

struct bme68x_iaq_data {
	/* Variable to store intermediate sample result */
	struct bme_sample_result latest;

	/* Trigger and corresponding handler */
	sensor_trigger_handler_t trg_handler;
	const struct sensor_trigger *trigger;

	/* Internal BSEC thread metadata value. */
	struct k_thread thread;

	/* Buffer used to maintain the BSEC library state. */
	uint8_t state_buffer[BSEC_MAX_STATE_BLOB_SIZE];

	/* Size of the saved state */
	int32_t state_len;

	bsec_sensor_configuration_t required_sensor_settings[BSEC_MAX_PHYSICAL_SENSOR];
	uint8_t n_required_sensor_settings;

	/* some RAM space needed by bsec_get_state and bsec_set_state for (de-)serialization. */
	uint8_t work_buffer[BSEC_MAX_WORKBUFFER_SIZE];

	bool initialized;

	struct bme68x_dev dev;
};

#endif /* ZEPHYR_DRIVERS_SENSOR_BME68X_NCS */
```

### Driver Code

BME680은 sleep mode에서 0.15 µA의 저전력 소모이며 측정종료시 자동으로 들어가기때문에 PM코드는 따로 없는것으로 보인다.

- NCS Driver에서 변경사항
  - device compatible을 bosch,bme68x로 변경했다. (line 22)
  - CONFIG_BME68X_IAQ 옵션에 따라 iaq,voc,co2등의 gas측정을 on/off한다.
    - line (30~34)(53~66)(168~183)(272~276)(518~527)

```c title=Drivers/bme68x_iaq/bme68x_iaq.c lineNumbers=true {22,30-34,53-66,168-183,272-276,518-527}
/*
 * Copyright (c) 2023 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-5-Clause
 */

/* NCS Integration for BME68X + BSEC */

#include <string.h>
#include <zephyr/kernel.h>
#include <zephyr/init.h>
#include <zephyr/settings/settings.h>
#include <zephyr/drivers/i2c.h>
#include <zephyr/drivers/sensor.h>

#include "bme68x_iaq.h"
#include "bsec_datatypes.h"

#include <zephyr/logging/log.h>
LOG_MODULE_REGISTER(bsec, CONFIG_BME68X_LOG_LEVEL);

#define DT_DRV_COMPAT bosch_bme68x

#define BSEC_TOTAL_HEAT_DUR	     UINT16_C(140)
#define BSEC_INPUT_PRESENT(x, shift) (x.process_data & (1 << (shift - 1)))

/* Temperature offset due to external heat sources. */
static const float temp_offset = (CONFIG_BME68X_IAQ_TEMPERATURE_OFFSET / (float)100);

#if defined(CONFIG_BME68X_IAQ)
#define BSEC_N_OUTPUTS 6
#else
#define BSEC_N_OUTPUTS 3
#endif

/* Define which sensor values to request.
 * The order is not important, but output_ready needs to be updated if different types
 * of sensor values are requested.
 */
static const bsec_sensor_configuration_t bsec_requested_virtual_sensors[BSEC_N_OUTPUTS] = {
	{
		.sensor_id = BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_TEMPERATURE,
		.sample_rate = BSEC_SAMPLE_RATE,
	},
	{
		.sensor_id = BSEC_OUTPUT_RAW_PRESSURE,
		.sample_rate = BSEC_SAMPLE_RATE,
	},
	{
		.sensor_id = BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_HUMIDITY,
		.sample_rate = BSEC_SAMPLE_RATE,
	},
#if defined(CONFIG_BME68X_IAQ)
	{
		.sensor_id = BSEC_OUTPUT_IAQ,
		.sample_rate = BSEC_SAMPLE_RATE_IAQ,
	},
	{
		.sensor_id = BSEC_OUTPUT_CO2_EQUIVALENT,
		.sample_rate = BSEC_SAMPLE_RATE_IAQ,
	},
	{
		.sensor_id = BSEC_OUTPUT_BREATH_VOC_EQUIVALENT,
		.sample_rate = BSEC_SAMPLE_RATE_IAQ,
	},
#endif
};

/* Definitions used to store and retrieve BSEC state from the settings API */
#define SETTINGS_NAME_BSEC  "bsec"
#define SETTINGS_KEY_STATE  "state"
#define SETTINGS_BSEC_STATE SETTINGS_NAME_BSEC "/" SETTINGS_KEY_STATE

/* Stack size of internal BSEC thread. */
static K_THREAD_STACK_DEFINE(thread_stack, CONFIG_BME68X_IAQ_THREAD_STACK_SIZE);

/* Used for a timeout for when BSEC's state should be saved. */
static K_TIMER_DEFINE(bsec_save_state_timer, NULL, NULL);

/* I2C spec for BME68x sensor */
static struct i2c_dt_spec bme68x_i2c_spec;

/* Semaphore to make sure output data isn't read while being updated */
static K_SEM_DEFINE(output_sem, 1, 1);

static int settings_load_handler(const char *key, size_t len, settings_read_cb read_cb,
				 void *cb_arg, void *param)
{
	ARG_UNUSED(key);
	struct bme68x_iaq_data *data = param;

	if (len > ARRAY_SIZE(data->state_buffer)) {
		return -EINVAL;
	}

	data->state_len = read_cb(cb_arg, data->state_buffer, len);

	if (data->state_len > 0) {
		return 0;
	}

	LOG_WRN("No settings data read");
	return -ENODATA;
}

/* Export current state of BSEC and save it to flash. */
static void state_save(const struct device *dev)
{
	int ret;
	struct bme68x_iaq_data *data = dev->data;

	LOG_DBG("saving state to flash");

	ret = bsec_get_state(0, data->state_buffer, ARRAY_SIZE(data->state_buffer),
			     data->work_buffer, ARRAY_SIZE(data->work_buffer), &data->state_len);

	__ASSERT(ret == BSEC_OK, "bsec_get_state failed.");
	__ASSERT(data->state_len <= sizeof(data->state_buffer), "state buffer too big to save.");

	ret = settings_save_one(SETTINGS_BSEC_STATE, data->state_buffer, data->state_len);

	__ASSERT(ret == 0, "storing state to flash failed.");
}

/* I2C bus write forwarder for bme68x driver */
static int8_t bus_write(uint8_t reg_addr, const uint8_t *reg_data_ptr, uint32_t len, void *intf_ptr)
{
	uint8_t buf[len + 1];

	buf[0] = reg_addr;
	memcpy(&buf[1], reg_data_ptr, len);

	return i2c_write_dt(&bme68x_i2c_spec, buf, ARRAY_SIZE(buf));
}

/* I2C bus read forwarder for bme68x driver */
static int8_t bus_read(uint8_t reg_addr, uint8_t *reg_data_ptr, uint32_t len, void *intf_ptr)
{
	return i2c_write_read_dt(&bme68x_i2c_spec, &reg_addr, 1, reg_data_ptr, len);
}

/* delay function for bme68x driver */
static void delay_us(uint32_t period, void *intf_ptr)
{
	k_usleep((int32_t)period);
}

/* function to handle output of BSEC */
static void output_ready(const struct device *dev, const bsec_output_t *outputs, uint8_t n_outputs)
{
	struct bme68x_iaq_data *data = dev->data;

	k_sem_take(&output_sem, K_FOREVER);
	for (size_t i = 0; i < n_outputs; ++i) {
		switch (outputs[i].sensor_id) {
		case BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_TEMPERATURE:
			data->latest.temperature = (double)outputs[i].signal;
			LOG_DBG("Temp: %.2f C", data->latest.temperature);
			break;
		case BSEC_OUTPUT_RAW_PRESSURE:
			data->latest.pressure = (double)outputs[i].signal;
			LOG_DBG("Press: %.2f Pa", data->latest.pressure);
			break;
		case BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_HUMIDITY:
			data->latest.humidity = (double)outputs[i].signal;
			LOG_DBG("Hum: %.2f %%", data->latest.humidity);
			break;
#if defined(CONFIG_BME68X_IAQ)
		case BSEC_OUTPUT_IAQ:
			data->latest.air_quality[0] = (uint16_t)outputs[i].signal;
			data->latest.air_quality[1] = outputs[i].accuracy;
			LOG_DBG("IAQ: %d (accuracy %d)", data->latest.air_quality[0],
				data->latest.air_quality[1]);
			break;
		case BSEC_OUTPUT_CO2_EQUIVALENT:
			data->latest.eCO2 = (double)outputs[i].signal;
			LOG_DBG("CO2 %.2f", data->latest.eCO2);
			break;
		case BSEC_OUTPUT_BREATH_VOC_EQUIVALENT:
			data->latest.breathVOC = (double)outputs[i].signal;
			LOG_DBG("VOC %.2f", data->latest.breathVOC);
			break;
#endif
		default:
			LOG_WRN("unknown bsec output id: %d", outputs[i].sensor_id);
			break;
		}
	}
	k_sem_give(&output_sem);
	if (data->trg_handler != NULL) {
		data->trg_handler(dev, data->trigger);
	}
}

/* convert raw bme68x output to valid input for BSEC */
static size_t sensor_data_to_bsec_inputs(bsec_bme_settings_t sensor_settings,
					 const struct bme68x_data *data, bsec_input_t *inputs,
					 uint64_t timestamp_ns)
{
	size_t i = 0;

	if (BSEC_INPUT_PRESENT(sensor_settings, BSEC_INPUT_TEMPERATURE)) {
		/* append heatsource input */
		inputs[i].sensor_id = BSEC_INPUT_HEATSOURCE;
		inputs[i].signal = temp_offset;
		inputs[i].time_stamp = timestamp_ns;
		LOG_DBG("Temp offset: %.2f", inputs[i].signal);
		i++;

		/* append temperature input */
		inputs[i].sensor_id = BSEC_INPUT_TEMPERATURE;
		inputs[i].signal = data->temperature;

		if (IS_ENABLED(BME68X_DO_NOT_USE_FPU)) {
			/* in this config, temperature is output in centidegrees */
			inputs[i].signal /= 100.0f;
		}

		inputs[i].time_stamp = timestamp_ns;
		LOG_DBG("Temp: %.2f", inputs[i].signal);
		i++;
	}
	if (BSEC_INPUT_PRESENT(sensor_settings, BSEC_INPUT_HUMIDITY)) {
		inputs[i].sensor_id = BSEC_INPUT_HUMIDITY;
		inputs[i].signal = data->humidity;

		if (IS_ENABLED(BME68X_DO_NOT_USE_FPU)) {
			/* in this config, humidity is output in millipercent */
			inputs[i].signal /= 1000.0f;
		}

		inputs[i].time_stamp = timestamp_ns;
		LOG_DBG("Hum: %.2f", inputs[i].signal);
		i++;
	}
	if (BSEC_INPUT_PRESENT(sensor_settings, BSEC_INPUT_PRESSURE)) {
		inputs[i].sensor_id = BSEC_INPUT_PRESSURE;
		inputs[i].signal = data->pressure;
		inputs[i].time_stamp = timestamp_ns;
		LOG_DBG("Press: %.2f", inputs[i].signal);
		i++;
	}
	if (BSEC_INPUT_PRESENT(sensor_settings, BSEC_INPUT_GASRESISTOR)) {
		inputs[i].sensor_id = BSEC_INPUT_GASRESISTOR;
		inputs[i].signal = data->gas_resistance;
		inputs[i].time_stamp = timestamp_ns;
		LOG_DBG("Gas: %.2f", inputs[i].signal);
		i++;
	}
	if (BSEC_INPUT_PRESENT(sensor_settings, BSEC_INPUT_PROFILE_PART)) {
		inputs[i].sensor_id = BSEC_INPUT_PROFILE_PART;
		if (sensor_settings.op_mode == BME68X_FORCED_MODE) {
			inputs[i].signal = 0;
		} else {
			inputs[i].signal = data->gas_index;
		}
		inputs[i].time_stamp = timestamp_ns;
		LOG_DBG("Profile: %.2f", inputs[i].signal);
		i++;
	}
	return i;
}

/* convert and apply bme68x settings chosen by BSEC */
static int apply_sensor_settings(const struct device *dev, bsec_bme_settings_t sensor_settings)
{
	int ret;
	struct bme68x_conf config = {0};
	struct bme68x_heatr_conf heater_config = {0};
	struct bme68x_iaq_data *data = dev->data;

#if defined(CONFIG_BME68X_IAQ)
	heater_config.enable = BME68X_ENABLE;
#else
	heater_config.enable = BME68X_DISABLE;
#endif
	heater_config.heatr_temp = sensor_settings.heater_temperature;
	heater_config.heatr_dur = sensor_settings.heater_duration;
	heater_config.heatr_temp_prof = sensor_settings.heater_temperature_profile;
	heater_config.heatr_dur_prof = sensor_settings.heater_duration_profile;
	heater_config.profile_len = sensor_settings.heater_profile_len;
	heater_config.shared_heatr_dur = 0;

	switch (sensor_settings.op_mode) {
	case BME68X_PARALLEL_MODE:
		/* this block is only executed for BME68X_PARALLEL_MODE */
		/* shared heating duration in milliseconds (converted from microseconds) */
		heater_config.shared_heatr_dur =
			BSEC_TOTAL_HEAT_DUR -
			(bme68x_get_meas_dur(sensor_settings.op_mode, &config, &data->dev) /
			 INT64_C(1000));

		__fallthrough;
	case BME68X_FORCED_MODE:
		/* this block is executed for any measurement mode */
		ret = bme68x_get_conf(&config, &data->dev);
		if (ret) {
			LOG_ERR("bme68x_get_conf err: %d", ret);
			return ret;
		}

		config.os_hum = sensor_settings.humidity_oversampling;
		config.os_temp = sensor_settings.temperature_oversampling;
		config.os_pres = sensor_settings.pressure_oversampling;

		ret = bme68x_set_conf(&config, &data->dev);
		if (ret) {
			LOG_ERR("bme68x_set_conf err: %d", ret);
			return ret;
		}

		bme68x_set_heatr_conf(sensor_settings.op_mode, &heater_config, &data->dev);

		__fallthrough;
	case BME68X_SLEEP_MODE:
		/* this block is executed for all modes */
		ret = bme68x_set_op_mode(sensor_settings.op_mode, &data->dev);
		if (ret) {
			LOG_ERR("bme68x_set_op_mode err: %d", ret);
			return ret;
		}
		break;
	default:
		LOG_ERR("unknown op mode: %d", sensor_settings.op_mode);
	}
	return 0;
}

static void fetch_and_process_output(const struct device *dev, bsec_bme_settings_t *sensor_settings,
				     uint64_t timestamp_ns)
{
	uint8_t n_fields = 0;
	uint8_t n_outputs = 0;
	uint8_t n_inputs = 0;
	bsec_input_t inputs[BSEC_MAX_PHYSICAL_SENSOR] = {0};
	bsec_output_t outputs[ARRAY_SIZE(bsec_requested_virtual_sensors)] = {0};
	struct bme68x_data sensor_data[3] = {0};
	struct bme68x_iaq_data *data = dev->data;
	int ret = bme68x_get_data(sensor_settings->op_mode, sensor_data, &n_fields, &data->dev);

	if (ret) {
		LOG_DBG("bme68x_get_data err: %d", ret);
		return;
	}

	for (size_t i = 0; i < n_fields; ++i) {
		n_outputs = ARRAY_SIZE(bsec_requested_virtual_sensors);
		n_inputs = sensor_data_to_bsec_inputs(*sensor_settings, sensor_data + i, inputs,
						      timestamp_ns);

		if (n_inputs == 0) {
			continue;
		}
		ret = bsec_do_steps(inputs, n_inputs, outputs, &n_outputs);
		if (ret != BSEC_OK) {
			LOG_ERR("bsec_do_steps err: %d", ret);
			continue;
		}
		output_ready(dev, outputs, n_outputs);
	}
}

/* Manage all recurrings tasks for the sensor:
 * - update device settings according to BSEC
 * - fetch measurement values
 * - update BSEC state
 * - periodically save BSEC state to flash
 */
static void bsec_thread_fn(const struct device *dev)
{
	int ret;
	bsec_bme_settings_t sensor_settings = {0};

	while (true) {
		uint64_t timestamp_ns = k_ticks_to_ns_floor64(k_uptime_ticks());

		if (timestamp_ns < sensor_settings.next_call) {
			LOG_DBG("bsec_sensor_control not ready yet");
			k_sleep(K_NSEC(sensor_settings.next_call - timestamp_ns));
			continue;
		}

		memset(&sensor_settings, 0, sizeof(sensor_settings));
		ret = bsec_sensor_control((int64_t)timestamp_ns, &sensor_settings);
		if (ret != BSEC_OK) {
			LOG_ERR("bsec_sensor_control err: %d", ret);
			continue;
		}

		if (apply_sensor_settings(dev, sensor_settings)) {
			continue;
		}

		if (sensor_settings.trigger_measurement &&
		    sensor_settings.op_mode != BME68X_SLEEP_MODE) {
			fetch_and_process_output(dev, &sensor_settings, timestamp_ns);
		}

		/* if save timer is expired, save and restart timer */
		if (k_timer_remaining_get(&bsec_save_state_timer) == 0) {
			state_save(dev);
			k_timer_start(&bsec_save_state_timer,
				      K_MINUTES(CONFIG_BME68X_IAQ_SAVE_INTERVAL_MINUTES),
				      K_NO_WAIT);
		}

		k_sleep(K_SECONDS(BSEC_SAMPLE_PERIOD_S));
	}
}

static int bme68x_bsec_init(const struct device *dev)
{
	int err;
	struct bme68x_iaq_data *data = dev->data;
	const struct bme68x_iaq_config *config = dev->config;

	bme68x_i2c_spec = config->i2c;

	err = settings_subsys_init();
	if (err) {
		LOG_ERR("settings_subsys_init, error: %d", err);
		return err;
	}

	err = settings_load_subtree_direct(SETTINGS_BSEC_STATE, settings_load_handler, data);
	if (err) {
		LOG_ERR("settings_load_subtree, error: %d", err);
		return err;
	}

	if (!device_is_ready(bme68x_i2c_spec.bus)) {
		LOG_ERR("I2C device not ready");
		return -ENODEV;
	}

	data->dev.intf = BME68X_I2C_INTF;
	data->dev.intf_ptr = NULL;
	data->dev.read = bus_read;
	data->dev.write = bus_write;
	data->dev.delay_us = delay_us;
	data->dev.amb_temp = CONFIG_BME68X_IAQ_EXPECTED_AMBIENT_TEMP;

	err = bme68x_init(&data->dev);
	if (err) {
		LOG_ERR("Failed to init bme68x: %d", err);
		return err;
	}

	err = bsec_init();
	if (err != BSEC_OK) {
		LOG_ERR("Failed to init BSEC: %d", err);
		return err;
	}

	err = bsec_set_state(data->state_buffer, data->state_len, data->work_buffer,
			     ARRAY_SIZE(data->work_buffer));
	if (err != BSEC_OK && err != BSEC_E_CONFIG_EMPTY) {
		LOG_ERR("Failed to set BSEC state: %d", err);
	} else if (err == BSEC_OK) {
		LOG_DBG("Setting BSEC state successful.");
	}

	bsec_update_subscription(bsec_requested_virtual_sensors,
				 ARRAY_SIZE(bsec_requested_virtual_sensors),
				 data->required_sensor_settings, &data->n_required_sensor_settings);

	k_thread_create(&data->thread, thread_stack, CONFIG_BME68X_IAQ_THREAD_STACK_SIZE,
			(k_thread_entry_t)bsec_thread_fn, (void *)dev, NULL, NULL,
			K_LOWEST_APPLICATION_THREAD_PRIO, 0, K_NO_WAIT);

	k_timer_start(&bsec_save_state_timer, K_MINUTES(CONFIG_BME68X_IAQ_SAVE_INTERVAL_MINUTES),
		      K_NO_WAIT);
	return 0;
}

static int bme68x_trigger_set(const struct device *dev, const struct sensor_trigger *trig,
			      sensor_trigger_handler_t handler)
{
	struct bme68x_iaq_data *data = dev->data;

	if (trig->type != SENSOR_TRIG_TIMER) {
		LOG_ERR("Unsupported sensor channel");
		return -ENOTSUP;
	}

	if ((trig->chan == SENSOR_CHAN_ALL) || (trig->chan == SENSOR_CHAN_HUMIDITY) ||
	    (trig->chan == SENSOR_CHAN_AMBIENT_TEMP) || (trig->chan == SENSOR_CHAN_PRESS) ||
	    (trig->chan == SENSOR_CHAN_IAQ)) {
		data->trigger = trig;
		data->trg_handler = handler;
	} else {
		LOG_ERR("Unsupported sensor channel");
		return -ENOTSUP;
	}
	return 0;
}

static int bme68x_sample_fetch(const struct device *dev, enum sensor_channel chan)
{
	/* fetching is a requirement for the API */
	return 0;
}

static int bme68x_channel_get(const struct device *dev, enum sensor_channel chan,
			      struct sensor_value *val)
{
	struct bme68x_iaq_data *data = dev->data;
	int result = 0;

	k_sem_take(&output_sem, K_FOREVER);
	if (chan == SENSOR_CHAN_HUMIDITY) {
		sensor_value_from_double(val, data->latest.humidity);
	} else if (chan == SENSOR_CHAN_AMBIENT_TEMP) {
		sensor_value_from_double(val, data->latest.temperature);
	} else if (chan == SENSOR_CHAN_PRESS) {
		sensor_value_from_double(val, data->latest.pressure);
	}
#if defined(CONFIG_BME68X_IAQ)
	else if (chan == SENSOR_CHAN_IAQ) {
		val->val1 = data->latest.air_quality[0];
		val->val2 = data->latest.air_quality[1];
	} else if (chan == SENSOR_CHAN_CO2) {
		sensor_value_from_double(val, data->latest.eCO2);
	} else if (chan == SENSOR_CHAN_VOC) {
		sensor_value_from_double(val, data->latest.breathVOC);
	}
#endif
	else {
		LOG_ERR("Unsupported sensor channel");
		result = -ENOTSUP;
	}
	k_sem_give(&output_sem);
	return result;
}

static const struct sensor_driver_api bme68x_driver_api = {
	.sample_fetch = &bme68x_sample_fetch,
	.channel_get = &bme68x_channel_get,
	.trigger_set = bme68x_trigger_set,
};

/* there can be only one device supported here because of BSECs internal state */
static struct bme68x_iaq_config config_0 = {
	.i2c = I2C_DT_SPEC_INST_GET(0),
};
static struct bme68x_iaq_data data_0;

SENSOR_DEVICE_DT_INST_DEFINE(0, bme68x_bsec_init, NULL, &data_0, &config_0, POST_KERNEL,
			     CONFIG_SENSOR_INIT_PRIORITY, &bme68x_driver_api);
```

## Application Sample

### Project Config

```text title=prj.conf
CONFIG_I2C=y
CONFIG_SENSOR=y
CONFIG_SENSOR_INFO=y

# Temperature, Pressure, Humidity
CONFIG_BME68X=y
# Gas Mode(IAQ, CO2, VOC)
CONFIG_BME68X_IAQ=y
# CONFIG_BME68X_LOG_LEVEL_DBG=y

# Settings - Used to store real-time device configuration to flash.
CONFIG_SETTINGS=y
CONFIG_SETTINGS_FCB=y
CONFIG_FCB=y
CONFIG_FLASH=y
CONFIG_FLASH_PAGE_LAYOUT=y
CONFIG_FLASH_MAP=y
CONFIG_STREAM_FLASH=y
CONFIG_MPU_ALLOW_FLASH_WRITE=y

CONFIG_NEWLIB_LIBC=y
CONFIG_NEWLIB_LIBC_FLOAT_SCANF=y

CONFIG_SERIAL=y
CONFIG_CONSOLE=y
CONFIG_UART_CONSOLE=y
CONFIG_LOG=y
CONFIG_LOG_MODE_DEFERRED=y
CONFIG_LOG_INFO_COLOR_GREEN=y

CONFIG_ASSERT=y
CONFIG_REBOOT=y
CONFIG_FPU=y
```

### Application Code

```c title=src/bme680_app.h
#ifndef __APP_BME680_H__
#define __APP_BME680_H__

#include <zephyr/drivers/sensor.h>

#if defined(CONFIG_BME68X)
struct bme680_data {
	struct sensor_value temp;
	struct sensor_value press;
	struct sensor_value humidity;
#if defined(CONFIG_BME68X_IAQ)
	struct sensor_value iaq;
	struct sensor_value eCO2;
	struct sensor_value breathVOC;
#endif
};

extern struct bme680_data bme680;

#endif
#endif
```

```c title=src/main.c
/**
 * @file main.c
 * @brief
 * @author bradkim02
 * @version v0.01
 * @date 2023-10-01
 */
#include <zephyr/kernel.h>
#include <zephyr/logging/log.h>

#include <drivers/bme68x_iaq.h>

#include "bme680_app.h"

LOG_MODULE_REGISTER(bme680, CONFIG_APP_LOG_LEVEL);

const struct sensor_trigger trig = {
	.chan = SENSOR_CHAN_ALL,
	.type = SENSOR_TRIG_TIMER,
};

struct bme680_data bme680;

static void trigger_handler(const struct device *dev, const struct sensor_trigger *trig)
{
	// sensor_sample_fetch(dev);
	sensor_channel_get(dev, SENSOR_CHAN_AMBIENT_TEMP, &bme680.temp);
	sensor_channel_get(dev, SENSOR_CHAN_PRESS, &bme680.press);
	sensor_channel_get(dev, SENSOR_CHAN_HUMIDITY, &bme680.humidity);
#if defined(CONFIG_BME68X_IAQ)
	sensor_channel_get(dev, SENSOR_CHAN_IAQ, &bme680.iaq);
	sensor_channel_get(dev, SENSOR_CHAN_CO2, &bme680.eCO2);
	sensor_channel_get(dev, SENSOR_CHAN_VOC, &bme680.breathVOC);
#endif

	LOG_INF("temp: %d.%06d°C; press: %d.%06dPa; humidity: %d.%06d%%", bme680.temp.val1,
		bme680.temp.val2, bme680.press.val1, bme680.press.val2, bme680.humidity.val1,
		bme680.humidity.val2);
#if defined(CONFIG_BME68X_IAQ)
	LOG_INF("iaq: %d(acc:%d); CO2: %dppm VOC: %dppm", bme680.iaq.val1, bme680.iaq.val2,
		bme680.eCO2.val1, bme680.breathVOC.val1);
#endif
};

int main(void)
{
	LOG_INF("bme680 iaq driver sample");
	const struct device *const dev = DEVICE_DT_GET_ANY(bosch_bme68x);
	if (!device_is_ready(dev)) {
		LOG_ERR("device is not ready");
		return 0;
	}

	k_sleep(K_SECONDS(2));

	int ret = sensor_trigger_set(dev, &trig, trigger_handler);
	if (ret) {
		LOG_ERR("couldn't set trigger");
		return 0;
	}

	while (1) {
		k_sleep(K_SECONDS(1));
	}
	return 0;
}
```

### Test Result

- SAMPLE_RATE는 전체 3초
- BSEC_SAMPLE_PERIOD_S=3으로 3초마다 trigger 됨

```text title=testLog
[00:05:30.973,541] <inf> bme680: temp: 22.769145°C; press: 101308.554687Pa; humidity: 40.439014%
[00:05:30.973,541] <inf> bme680: iaq: 55(acc:1); CO2: 512ppm VOC: 0ppm
```
