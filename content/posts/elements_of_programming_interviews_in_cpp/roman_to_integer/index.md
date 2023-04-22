---
title: 문제6.8 로마 숫자를 10진수로 바꾸기
subTitle: roman_to_integer
category: algorithm
date: 2023-04-21T18:56:44
cover: ../cover.jpeg
---

로마 숫자는 문자 집합 I(1), V(5), X(10), L(50), C(100), D(500), M(1000)으로 자연수를 표현한다.
또한 다음 규칙을 제외하고 항상 큰 수가 먼저 쓰여야 한다.

- I는 V혹은 X바로 전에 올 수 있다.
- X는 L혹은 C바로 전에 올 수 있다.
- C는 D혹은 M바로 전에 올 수 있다.

또한 LXC혹은 CDM처럼 예외가 연달아 나오는 경우는 불가능하다.

## 유효한 로마숫자가 문자열로 주어졌을 때 이에 상응하는 정수를 반환하라

```cpp
int RomanToInteger(const string& s) {
    unordered_map<char, int> m{{'I', 1},   {'V', 5},   {'X', 10},  {'L', 50},
                               {'C', 100}, {'D', 500}, {'M', 1000}};

    int sum = m[s.back()];
    for (auto it = s.rbegin() + 1; it != s.rend(); it++) {
        m[*it] < m[*prev(it)] ? sum -= m[*it] : sum += m[*it];
    }
    return sum;
}
```

## 응용: 로마 숫자가 주어졌을 때 유효한지 판단하는 프로그램을 작성하라

```cpp
bool RomanToInteger(const string& s) {
    unordered_map<char, int> m{{'I', 1},   {'V', 5},   {'X', 10},  {'L', 50},
                               {'C', 100}, {'D', 500}, {'M', 1000}};
    unordered_map<char, pair<char, char>> lookup{
        {'I', {'V', 'X'}}, {'X', {'L', 'C'}}, {'C', {'D', 'M'}}};

    int exceptionCount = 0;
    for (auto it = s.rbegin() + 1; it != s.rend(); it++) {
        if (m[*it] < m[*prev(it)]) {
            if (++exceptionCount > 1) return false;
            if (lookup[*it].first != *prev(it) &&
                lookup[*it].second != *prev(it))
                return false;
            continue;
        }

        exceptionCount = 0;
    }

    return true;
}
```

## 응용: 자연수 n이 주어졌을 때 이 숫자를 표현하는 가장 짧은 로마 표기법을 반환하는 프로그램을 작성하라

```cpp
string IntegerToRoman(long long n) {
    vector<pair<string, int>> v{
        {"I", 1},   {"IV", 4},   {"V", 5},   {"IX", 9},  {"X", 10},
        {"XL", 40}, {"L", 50},   {"XC", 90}, {"C", 100}, {"CD", 400},
        {"D", 500}, {"CM", 900}, {"M", 1000}};

    string result = "";
    for (auto it = v.rbegin(); it != v.rend(); it++) {
        if (it->second > n) continue;

        int divide = n / it->second;
        for (int i = 0; i < divide; i++) result += it->first;
        n %= it->second;
    }

    return result;
}
```
