---
title: 문제12.2 익명의 편지 작성하기
subTitle: is_anonymous_letter_constructible
category: algorithm
date: 2023-04-23T16:58:38
cover: ../cover.jpeg
---

# 문제

익명의 편지 텍스트와 잡지 텍스트가 주어졌을 때 해당 잡지를 사용해서 익명의 편지를 작성할 수 있는지 확인하는 프로그램을 작성하라. 익명의 편지를 쓰는 데 필요한 각각의 문자 개수가 잡지에 등장하는 문자의 개수보다 적다면, 잡지를 사용하여 익명의 편지를 작성할 수 있다.

```txt title=testCase
letter_text	magazine_text	bool
"123"	    "456"	        false
"123"	    "12222222"	    false
"123"	    "1123"	        true
"123"	    "123"	        true
"12323"	    "123"	        false
```

# 해법

```cpp
bool IsLetterConstructibleFromMagazine(const string& letter_text,
                                       const string& magazine_text) {
    unordered_map<char, int> m;

    for (auto c : letter_text) m[c]++;

    for (auto c : magazine_text) {
        auto it = m.find(c);
        if (it != m.cend()) {
            if (--it->second == 0) m.erase(it);
        }
        if (m.empty()) break;
    }

    return m.empty();
}
```
