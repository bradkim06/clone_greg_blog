---
title: 문제6.2 밑수 바꾸기
subTitle: convert_base
category: algorithm
date: 2023-04-21T14:05:59
cover: ../cover.jpeg
---

문자열 s와 두 개의 진수정보 b1, b2가 주어졌을 때 정수의 진수를 b1에서 b2로 변경하는 프로그램을 작성하라

시간 복잡도 $O(n(1 + \log_{b1}{b2}))$

> n : s의 길이

```cpp
string ConstructFromBase(int num_as_int, int base) {
    return num_as_int == 0
               ? ""
               : ConstructFromBase(num_as_int / base, base) +
                     static_cast<char>(num_as_int % base >= 10
                                           ? 'A' + num_as_int % base - 10
                                           : '0' + num_as_int % base);
}

string ConvertBase(const string& num_as_string, int b1, int b2) {
    bool is_negative = num_as_string.front() == '-';
    int num_as_int =
        accumulate(num_as_string.begin() + is_negative, num_as_string.end(), 0,
                   [b1](int x, char c) {
                       return x * b1 + (isdigit(c) ? c - '0' : c - 'A' + 10);
                   });
    return (is_negative ? "-" : "") +
           (num_as_int == 0 ? "0" : ConstructFromBase(num_as_int, b2));
}
```
