---
title: 문제6.3 스프레드시트 열 인코딩 계산하기
subTitle: spreadsheet_encoding
category: algorithm
date: 2023-04-21T14:15:12
cover: ../cover.jpeg
---

스프레드시트의 열값이 문자열로 주어졌을 때 이를 정수값으로 변환하는 함수를 작성하라("A"는 1을 나타낸다).
예를 들어 "D"는 4, "AA"는 27, "ZZ"는 702로 표현된다.

```cpp
int SSDecodeColID(const string& col) {
    return accumulate(col.begin(), col.end(), 0,
                      [](int n, char c) { return n * 26 + c - 'A' + 1; });
}
```

## 응용: "A"가 0으로 대응될 때 같은 문제를 풀어 보라

```cpp
int SSDecodeColID(const string& col) {
    return accumulate(col.begin(), col.end(), 0,
                      [](int n, char c) { return n * 26 + c - 'A' + 1; }) -
           col.size();
}
```

## 응용: 정수가 주어졌을 때 해당 정수를 스프레드시트의 열(column)값으로 바꾸는 함수를 작성하라. 예를 들어 4는 "D", 27은 "AA", 702는 "ZZ"로 대응된다

```cpp
string IDDecodeColSS(unsigned long long num) {
    return num == 0 ? ""
                    : IDDecodeColSS((num - 1) / 26) +
                          static_cast<char>('A' + (num - 1) % 26);
}
```
