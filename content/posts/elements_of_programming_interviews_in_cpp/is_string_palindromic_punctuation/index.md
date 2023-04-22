---
title: 문제6.5 회문 확인하기
subTitle: is_string_palindromic_punctuation
category: algorithm
date: 2023-04-21T17:28:16
cover: ../cover.jpeg
---

알파벳이 아닌 문자들을 모두 제거했을 때 앞뒤로 읽은 결과가 같은 경우를 판별하라.
예를 들어 "A man, a plan, a canal, Panama."와 "Able was I, ere I saw Elba!"는 회문이지만 "Ray a Ray"는 회문이 아니다.

```cpp
bool IsPalindrome(const string& s) {
    int left = 0, right = s.size() - 1;
    while (left < right) {
        while (!isalnum(s[left]) && left < right) left++;
        while (!isalnum(s[right]) && left < right) right--;
        if (toupper(s[left++]) != toupper(s[right--])) return false;
    }
    return true;
}
```

## 응용: 하나의 문자를 바꿀수 있다면 그것도 회문으로 인정한다

```cpp
#include <bits/stdc++.h>
using namespace std;

bool IsPalindrome(const string& s, int left, int right, bool isDelete) {
    while (left < right) {
        while (!isalnum(s[left]) && left < right) left++;
        while (!isalnum(s[right]) && left < right) right--;
        if (toupper(s[left++]) != toupper(s[right--])) {
            if (!isDelete && (IsPalindrome(s, left + 1, right, true) ||
                              IsPalindrome(s, left, right - 1, true))) {
                return true;
            }
            return false;
        }
    }
    return true;
}

int main() {
    string s = "A man, a plan, a canal, Panamaa.";
    cout << IsPalindrome(s, 0, s.size() - 1, 0);
}
```
