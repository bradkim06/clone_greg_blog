---
title: 문제8.3 문자열이 올바른 형태인지 확인하기
subTitle: is_valid_parenthesization
category: algorithm
date: 2023-04-22T12:25:06
cover: ../cover.jpeg
---

서로 다른 괄호 종류가 올바른 순서로 짝을 이루고 있을 때, 문자열을 '올바른 형태'라고 한다.
예를들어 "([]){()}" 혹은 "[()[]{()()}]"는 올바른 형태이다. 하지만 "{)"혹은 "[()[]{()()"는 올바른 형태가 아니다.

'(',')','[',']','{','}'로 이루어진 문자열이 올바른 형태인지 확인하는 프로그램을 작성하라.

```cpp
bool IsWellFormed(const string& s) {
    unordered_map<char, char> m = {{'(', ')'}, {'[', ']'}, {'{', '}'}};

    stack<char> st;
    for (char c : s) {
        if (m.count(c)) {
            st.emplace(c);
            continue;
        }

        if (st.empty()) return false;
        if (m.at(st.top()) != c) return false;
        st.pop();
    }

    return st.empty();
}
```
