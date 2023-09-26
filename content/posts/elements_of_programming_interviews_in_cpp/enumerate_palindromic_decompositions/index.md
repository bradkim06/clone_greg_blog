---
title: 문제15.8 회문 분해하기
subTitle: enumerate_palindromic_decompositions
category: algorithm
date: 2023-04-25T11:53:39
cover: ../cover.jpeg
---

# 문제

주어진 문자열을 회문 문자열로 분해한 모든 결과를 구하라. 예를 들어 "0204451881"이라 한다면 <"020","44","5","1881">은 분해된 회문 문자열이고 <"020","44","5","1","88","1">도 회문 문자열이다. 하지만 <"02044","5","1881">은 분해된 회문 문자열이 아니다.

# 해답

마찬가지로 가지치기 Recursive 문제

```cpp
#include <bits/stdc++.h>
using namespace std;

bool IsPalindrome(const string& prefix) {
    int left = 0, right = prefix.size() - 1;
    while (right >= left) {
        if (prefix[left++] != prefix[right--]) return false;
    }
    return true;
}

vector<vector<string>> PalindromeDecompositions(const string& text) {
    vector<vector<string>> result;

    function<void(int, vector<string>*)> dfs = [&](int depth,
                                                   vector<string>* partial) {
        if (depth == text.size()) {
            result.emplace_back(*partial);
            return;
        }

        for (int i = depth; i <= text.size(); i++) {
            string curr = text.substr(depth, i - depth + 1);
            if (IsPalindrome(curr)) {
                partial->emplace_back(curr);
                dfs(i + 1, partial);
                partial->pop_back();
            }
        }
    };

    dfs(0, make_unique<vector<string>>().get());

    return result;
}

int main() {
    auto res = PalindromeDecompositions("0204451881");
    cout << "result " << res.size() << endl;
    for (auto el : res) {
        for (auto e : el) cout << e << ' ';
        cout << endl;
    }

    return 0;
}
```
