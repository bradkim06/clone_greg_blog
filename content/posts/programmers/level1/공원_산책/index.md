---
title: 공원 산책
subTitle: level1, 연습문제
category: programmers
date: 2023-04-25T14:35:27
cover: ../../cover.jpeg
---

# 문제

[공원 산책 링크](https://school.programmers.co.kr/learn/courses/30/lessons/172928)

# 해답

단순 구현 문제로 주어진 지문대로만 작성하면 된다

```cpp
#include <bits/stdc++.h>

using namespace std;

vector<int> solution(vector<string> park, vector<string> routes) {
    int x, y, n = park.size(), m = park[0].size();
    for (int i = 0; i < n; i++) {
        size_t pos = park[i].find('S');
        if (pos != string::npos) {
            x = pos, y = i;
            break;
        }
    }

    unordered_map<string, pair<int, int>> _map{
        {"N", {0, -1}}, {"S", {0, 1}}, {"W", {-1, 0}}, {"E", {1, 0}}};
    function<void(int, pair<int, int>)> moveRobot =
        [&](int distance, pair<int, int> direction) {
            int tmpY = y, tmpX = x;

            for (int i = 1; i <= distance; i++) {
                int ny = tmpY + direction.second, nx = tmpX + direction.first;
                if (ny < 0 || ny >= n || nx < 0 || nx >= m) return;
                if (park[ny][nx] == 'X') return;
                tmpY = ny, tmpX = nx;
            }

            y = tmpY, x = tmpX;
        };

    for (string r : routes) {
        stringstream ss(r);
        string token;
        pair<int, int> direction{0, 0};

        while (getline(ss, token, ' ')) {
            if (_map.count(token)) {
                direction = _map.at(token);
            } else {
                moveRobot(stoi(token), direction);
            }
        }
    }

    return {y, x};
}
```
