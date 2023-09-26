---
title: 문제13.5 동전으로 만들 수 없는 가장 작은 숫자 구하기
subTitle: smallest_nonconstructible_value
category: algorithm
date: 2023-04-24T12:37:43
cover: ../cover.jpeg
---

# 문제

몇 개의 동전을 가지고 있다고 할 때, 이 동전들을 조합해서 만들 수 없는 숫자가 있다. 예를 들면 동전들을 모두 합친 것보다 더 큰 숫자를 만들 수는 없다. 또, 가지고 있는 동전이 <1,1,1,1,1,5,10,25>라면 이 동전들을 조합해서 21은 만들 수 없는 숫자 중 가장 작다.

양의 정수 배열을 입력받고 부분 배열의 합으로 만들 수 없는 가장 작은 숫자를 반환하는 프로그램을 작성하라.

# 해답

추가되는 수가 현재까지의 합보다 크다면 불가능하다.

$n(logn)$

```cpp
int SmallestNonconstructibleValue(vector<int> A) {
    sort(begin(A), end(A));
    int max_constructible_value = 0;
    for (int a : A) {
        if (a > max_constructible_value + 1) {
            break;
        }
        max_constructible_value += a;
    }
    return max_constructible_value + 1;
}
```
