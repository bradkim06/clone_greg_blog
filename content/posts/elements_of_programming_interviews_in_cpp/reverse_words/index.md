---
title: 문제6.6 문장의 모든 단어 뒤집기
subTitle: reverse_words
category: algorithm
date: 2023-04-21T17:43:55
cover: ../cover.jpeg
---

빈칸으로 구분되는 단어 집합이 있을 때 이 단어의 순서를 역순으로 배열해 보자.
예를 들어 "Alice likes Bob"은 "Bob likes Alice"가 된다. 입력 문자열의 원본은 유지하지 않아도 된다.

```cpp
void ReverseWords(string* s) {
    reverse(s->begin(), s->end());

    size_t start = 0, finish;
    while ((finish = s->find(" ", start)) != string::npos) {
        reverse(s->begin() + start, s->begin() + finish);
        start = finish + 1;
    }

    reverse(s->begin() + start, s->end());
}
```
