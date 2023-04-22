---
title: 임의의 두 정수값 곱하기
subTitle: int_as_array_multiply
category: algorithm
date: 2023-04-20T16:14:31
cover: ../cover.jpeg
---

<1, 9, 3, 7, 0, 7, 7, 2, 1\> \* <-7, 6, 1, 8, 3, 8, 2, 5, 7, 2, 8, 7\> = <-1,4,7,5,7,3,9,5,2,5,8,9,6,7,6,4,1,2,9,2,7\>

```cpp
vector<int> Multiply(vector<int> num1, vector<int> num2) {
    const int sign = (num1.front() < 0) ^ (num2.front() < 0) ? -1 : 1;
    num1.front() = abs(num1.front()), num2.front() = abs(num2.front());

    vector<int> result(num1.size() + num2.size(), 0);
    for (int i = num1.size() - 1; i >= 0; --i) {
        for (int j = num2.size() - 1; j >= 0; --j) {
            result[i + j + 1] += num1[i] * num2[j];
            result[i + j] += result[i + j + 1] / 10;
            result[i + j + 1] %= 10;
        }
    }

    // 0으로 시작하는 부분을 제거한다
    result = {
        find_if_not(begin(result), end(result), [](int a) { return a == 0; }),
        end(result)};
    if (result.empty()) {
        return {0};
    }

    result.front() *= sign;
    return result;
}
```
