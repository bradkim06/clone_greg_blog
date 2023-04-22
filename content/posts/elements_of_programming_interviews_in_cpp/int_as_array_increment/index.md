---
title: 임의의 정수값 증가시키기
subTitle: int_as_array_increment
category: algorithm
date: 2023-04-20T15:12:39
cover: ../cover.jpeg
---

십진수 D를 나타낸 배열 A가 주어졌을 때 D + 1의 결과를 배열 A에 갱신하는 코드를 작성하라.
예를 들어 <1, 2, 9>가 주어졌다면 <1, 3, 0>을 리턴해야 한다.

# 무식한 방법

아주 직관적으로만 해결하면 배열의 숫자를 정수로 바꾼 뒤 1을 더하고 다시 배열에 쓰는 방법이 있다.
하지만 이 방법은 정수 범위를 벗어나면 동작하지 않는다.

```cpp
void PlusOne(vector<int>* A_ptr) {
    vector<int>& A = *A_ptr;

    long long num = 0;
    for (int i = 0; i < A.size(); i++) {
        num *= 10;
        num += A[i];
    }
    num++;

    const int num_digits = static_cast<int>(floor(log10(num))) + 1;
    int msd_mask = static_cast<int>(pow(10, num_digits - 1));
    if (num_digits != A.size()) A.push_back(0);
    for (int i = 0; i < num_digits; i++) {
        A[i] = num / msd_mask;
        num %= msd_mask;
        msd_mask /= 10;
    }
}
```

# 배열에 연산을 직접 적용하는 방법

```cpp
void PlusOne(vector<int>* A_ptr) {
    vector<int>& A = *A_ptr;
    ++A.back();

    for (int i = A.size() - 1; i > 0 && A[i] == 10; --i) {
        A[i] = 0, ++A[i - 1];
    }

    if (A[0] == 10) {
        // 최상위 숫자에 올림수가 존재하면 한자리가 더 필요
        // 첫 번째 항목을 1로 업데이트하고 배열 끝에는 0을 추가해주는 것이다
        A[0] = 1;
        A.emplace_back(0);
    }
}
```
