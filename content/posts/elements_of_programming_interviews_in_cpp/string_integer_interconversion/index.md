---
title: 문제6.1 문자열과 정수 상호 전환하기
subTitle: string_integer_interconversion
category: algorithm
date: 2023-04-21T13:04:59
cover: ../cover.jpeg
---

stoi같은 내장 라이브러리 함수를 사용하지 않고 문자열 <-> 정수 프로그램을 만들어라.

## 문자열 정수로 변환

```cpp
int StringToInt(const string& s) {
    bool isNegative = s.front() == '-';
    return (isNegative ? -1 : 1) *
           accumulate(s.begin() + (isNegative || s[0] == '+'), s.end(), 0,
                      [](int sum, char c) { return sum * 10 + c - '0'; });
}
```

## 정수 문자열 변환

```cpp
string IntToString(int x) {
    bool isNegative = x < 0;

    string s;
    do {
        s += '0' + abs(x % 10);
        x /= 10;
    } while (x);

    s += isNegative ? "-" : "";
    return {s.rbegin(), s.rend()};
}
```
