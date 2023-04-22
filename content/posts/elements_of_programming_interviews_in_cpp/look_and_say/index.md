---
title: 문제6.7 개미수열 문제
subTitle: look_and_say
category: algorithm
date: 2023-04-21T17:54:24
cover: ../cover.jpeg
---

개미수열은 1부터 시작하고 이전 수열에서 나타난 숫자와 해당 숫자가 연속으로 쓰인 개수를 함께 쓰는 방식으로 진행된다.

예를 들면 다음과 같다.

- 1은 1이 1개 : 11
- 11은 1이 2개 : 21
- 12은 2가 1개 1이 1개 : 1211

따라서 첫 여덟 개 숫자는
1,
11,
21,
1211,
111221,
312211,
13112221,
1113213211 과 같다.

정수 n이 주어졌을 때 n번째 개미수열을 문자열로 출력하는 프로그램을 작성하라

```cpp
string NextNumber(const string& s) {
    string result = "";
    for (int i = 0; i < s.size(); i++) {
        int count = 1;
        while (i + 1 < s.size() && s[i] == s[i + 1]) count++, i++;
        result += to_string(count) + s[i];
    }
    return result;
}

string LookAndSay(int n) {
    string s = "1";
    for (int i = 1; i < n; ++i) {
        cout << i << endl;
        s = NextNumber(s);
    }
    return s;
}
```
