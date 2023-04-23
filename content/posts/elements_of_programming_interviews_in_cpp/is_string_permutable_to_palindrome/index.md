---
title: 문제12.1 회문 순열 확인하기
subTitle: is_string_permutable_to_palindrome
category: algorithm
date: 2023-04-23T16:48:39
cover: ../cover.jpeg
---

# 문제

문자열을 구성하는 문자를 재배치해서 회문을 만들 수 있는지 확인하는 프로그램을 작성하라. 예를 들어 "edified"는 "deified"로 재배치가 가능하다.

# 해답

무식한 방법으로 문자열의 모든 순열을 구하여 회문인지 확인하는 것인데 시간 복잡도가 굉장히 높다.

회문 확인을 좀 더 자세히 살펴보면 'a'로 시작하는 문자열이 회문이 되려면 'a'로 끝나야 한다. 따라서 어떤 문자열이 회문이 되려면 모든 문자의 개수가 짝수여야 하고 문자열의 길이가 홀수인 경우만 중앙 문자가 홀수번 등장한다.

```cpp
bool CanFormPalindrome(const string &s) {
    unordered_set<char> chars_with_odd_frequency;
    for (char c : s) {
        if (!chars_with_odd_frequency.count(c)) {
            // c now has appeared an odd number of times.
            chars_with_odd_frequency.emplace(c);
            continue;
        }
        // c now has appeared an even number of times.
        chars_with_odd_frequency.erase(c);
    }
    // A string can be permuted to form a palindrome if and only if the number
    // of chars whose frequencies is odd is at most 1.
    return chars_with_odd_frequency.size() < 2;
}
```
