---
title: 문제6.11 반복 길이 부호화로 문자열을 압축,해제하기
subTitle: run_length_compression
category: algorithm
date: 2023-04-21T21:30:00
cover: ../cover.jpeg
---

반복 길이 부호화(RLE, Run-length encoding)는 압축 및 해제를 실시간으로 수행할 수 있는 효과적인 압축 방법이다.
실제 문자열 대신 문자와 해당 문자의 연속 등장 횟수를 함께 써 주면 된다.
예를 들어 "aaaabcccaa"를 RLE로 압축하면 "4a1b3c2a"가 되고, "3e4f2e"를 압축 해제하면 "eeeffffee"가 된다.

RLE를 사용해 문자열 압축 및 해제를 구현하라. 입력 문자열은 항상 유효하며 압축할 문자열은 숫자를 제외한 알파벳으로만 구성되어 있다.

$O(n)$

```cpp
string Decoding(const string &s) {
    string result;
    int count = 0;
    for (auto it = s.begin(); it != s.end(); it++) {
        if (isdigit(*it)) {
            count = count * 10 + *it - '0';
            continue;
        }

        result.append(count, *it);
        count = 0;
    }

    return result;
}

string Encoding(const string &s) {
    string result;
    int count = 1;
    for (auto it = s.begin(); it != s.end(); it++) {
        if (it != s.end() - 1 && *it == *next(it)) {
            count++;
            continue;
        }

        result += to_string(count) + *it;
        count = 1;
    }

    return result;
}
```
