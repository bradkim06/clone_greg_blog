---
title: 문제6.9 유효한 IP 주소 구하기
subTitle: valid_ip_addresses
category: algorithm
date: 2023-04-21T21:16:11
cover: ../cover.jpeg
---

문자 s는 "."이 빠져서 주어진다. 가능한 IP주소들을 모두 리턴해주는 프로그램을 작성해라

## for-loop, prunning $O(1)$

```cpp
bool IsValidPart(const string& s) {
    if (s.size() > 3) {
        return false;
    }
    // "00", "000", "01", etc. are not valid, but "0" is valid.
    if (s.front() == '0' && s.size() > 1) {
        return false;
    }
    int val = stoi(s);
    return val <= 255 && val >= 0;
}

vector<string> GetValidIpAddress(const string& s) {
    vector<string> result;
    for (size_t i = 1; i < 4 && i < s.size(); ++i) {
        if (const string first = s.substr(0, i); IsValidPart(first)) {
            for (size_t j = 1; i + j < s.size() && j < 4; ++j) {
                const string second = s.substr(i, j);
                if (IsValidPart(second)) {
                    for (size_t k = 1; i + j + k < s.size() && k < 4; ++k) {
                        const string third = s.substr(i + j, k),
                                     fourth = s.substr(i + j + k);
                        if (IsValidPart(third) && IsValidPart(fourth)) {
                            result.emplace_back(first + "." + second + "." +
                                                third + "." + fourth);
                        }
                    }
                }
            }
        }
    }
    return result;
}
```

## 응용: 마침표의 개수가 k개이고 문자열의 길이에 제한이 없을 때 같은 문제를 풀어보라

DFS, Prunning

```cpp
#include <bits/stdc++.h>
using namespace std;

bool IsValidPart(const string& s) {
    if (s.size() > 3) {
        return false;
    }
    // "00", "000", "01", etc. are not valid, but "0" is valid.
    if (s.front() == '0' && s.size() > 1) {
        return false;
    }
    int val = stoi(s);
    return val <= 255 && val >= 0;
}

vector<string> GetValidIpAddress(const string& s, int k) {
    vector<string> result;
    string tmp(s);

    function<void(int depth, string res, const string& address)> dfs =
        [&k, &result, &dfs](int depth, string res, const string& address) {
            if (depth == k - 1) {
                if (IsValidPart(address)) result.emplace_back(res + address);
                return;
            }

            for (int i = 1; i < address.size() && i < 4; i++) {
                const string part = address.substr(0, i);
                if (IsValidPart(part)) {
                    dfs(depth + 1, res + part + ".", address.substr(i));
                }
            }
        };

    dfs(0, "", s);

    return result;
}

int main() {
    for (auto e : GetValidIpAddress("255255255255", 5)) {
        cout << e << endl;
    }
}
```

```markdown
2.55.255.255.255
25.5.255.255.255
25.52.55.255.255
255.2.55.255.255
255.25.5.255.255
255.25.52.55.255
255.255.2.55.255
255.255.25.5.255
255.255.25.52.55
255.255.255.2.55
255.255.255.25.5

[Process exited 0]
```
