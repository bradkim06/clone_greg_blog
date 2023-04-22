---
title: 주식 사고팔기 문제
subTitle: BuyAndSellStock
category: algorithm
date: 2023-04-20T19:15:36
cover: ../cover.jpeg
---

# 주식 한 번 사고팔기(BuyAndSellStockOnce)

시간에 따른 주식가격 배열 <310,315,275,295,260,270,290,230,255,250\>에서 주식을 한 번 사고 팔아서 최대 이윤을 남기는 프로그램 작성하라.

시간을 고려해야 하므로 260에 사서 290에 파는게 최대값이다. 현재 시간 기준으로 최소값을 기록해두면 된다.

```cpp
double BuyAndSellStockOnce(const vector<double>& prices) {
    double min_price_so_far = numeric_limits<double>::infinity(),
           max_profit = 0;
    for (double price : prices) {
        double max_profit_sell_today = price - min_price_so_far;
        max_profit = max(max_profit, max_profit_sell_today);
        min_price_so_far = min(min_price_so_far, price);
    }
    return max_profit;
}
```

## 응용: 배열이 주어졌을 때, 연속한 값이 같은 부분 배열 중 길이가 가장 긴 부분 배열의 길이를 구하는 프로그램을 작성해 보자.

# 주식 두 번 사고팔기(BuyAndSellStockTwice)

이번에는 주식 한 주를 최대 두번까지 매매할 수 있을 때 최대 이윤을 구하는 프로그램을 작성하라. 단, 두번째 주식은 첫 번째 주식을 판 뒤에 구입할 수 있다.

```cpp
double BuyAndSellStockTwice(const vector<double>& prices) {
    double max_total_profit = 0;
    vector<double> first_buy_sell_profits(prices.size(), 0);
    double min_price_so_far = numeric_limits<double>::infinity();

    // Forward phase. For each day, we record maximum profit if we
    // sell on that day.
    for (int i = 0; i < prices.size(); ++i) {
        min_price_so_far = min(min_price_so_far, prices[i]);
        max_total_profit = max(max_total_profit, prices[i] - min_price_so_far);
        first_buy_sell_profits[i] = max_total_profit;
    }

    // Backward phase. For each day, find the maximum profit if we make
    // the second buy on that day.
    double max_price_so_far = numeric_limits<double>::min();
    for (int i = prices.size() - 1; i > 0; --i) {
        max_price_so_far = max(max_price_so_far, prices[i]);
        max_total_profit = max(max_total_profit, max_price_so_far - prices[i] +
                                                     first_buy_sell_profits[i]);
    }
    return max_total_profit;
}
```

## 응용:같은 문제를 $O(n)$ 시간, $O(1)$ 공간을 이용해서 풀어 보라

```cpp
double BuyAndSellStockTwiceConstantSpace(const vector<double>& prices) {
    array<double, 2> min_prices = {numeric_limits<double>::infinity(),
                                   numeric_limits<double>::infinity()},
                     max_profits = {0.0, 0.0};
    for (double price : prices) {
        for (int i = 1; i >= 0; --i) {
            max_profits[i] = max(max_profits[i], price - min_prices[i]);
            min_prices[i] = min(
                min_prices[i], price - (i - 1 >= 0 ? max_profits[i - 1] : 0.0));
        }
    }
    return max_profits[1];
}
```
