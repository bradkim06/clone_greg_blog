---
title: 퍼즐 조각 채우기
subTitle: level3, 깊이/너비 우선 탐색(DFS/BFS)
category: programmers
date: 2023-04-25T14:38:24
cover: ../../cover.jpeg
---

# 문제

[퍼즐 조각 채우기 링크](https://school.programmers.co.kr/learn/courses/30/lessons/84021)

# 해답

문제의 주어진 조건들을 구현하는 문제인데 조건들이 생각보다 많다.
통과를 하긴 했지만 좀 더 최적화를 해야될 것 같다.

1. 재귀 탐색을 통해 table의 조각들을 가져온다
2. 조각들은 회전이 가능하므로 4가지 방향 모두 확인해야 한다.
3. 조각은 다양하게 채워질 수 있으므로 큰 조각부터 확인한다.
4. 조각이 Fit한지 확인한다.
5. Fit하다면 board에 조각을 채우고 채운 개수를 count
6. 종료된 count를 반환한다.

```cpp
#include <bits/stdc++.h>

using namespace std;

int dx[] = {1, 0, -1, 0};
int dy[] = {0, -1, 0, 1};

vector<vector<int>> rotateVector(vector<vector<int>> &v) {
    int m = v.size();
    int n = v[0].size();
    vector<vector<int>> tmp(n, vector<int>(m, 0));

    for (int y = 0; y < n; y++) {
        for (int x = 0; x < m; x++) {
            tmp[y][x] = v[m - x - 1][y];
        }
    }

    return tmp;
}

vector<vector<int>> getParts(vector<vector<int>> v, int vx, int vy, int n,
                             int m) {
    vector<vector<int>> res(n, vector<int>(m, 0));

    for (int y = 0; y < n; y++) {
        for (int x = 0; x < m; x++) {
            res[y][x] = v[y + vy][x + vx];
        }
    }

    return res;
}

// key & lock 확인
bool isFit(vector<vector<int>> key, vector<vector<int>> board, int nx, int ny) {
    int n = key.size(), m = key[0].size();
    stack<pair<int, int>> st;

    for (int y = 0; y < n; y++) {
        for (int x = 0; x < m; x++) {
            if (board[y + ny][x + nx] == 0) st.push({y + ny, x + nx});
            board[y + ny][x + nx] += key[y][x];
        }
    }

    for (int y = 0; y < n; y++) {
        for (int x = 0; x < m; x++) {
            if (board[y + ny][x + nx] != 1) return false;
        }
    }

    while (!st.empty()) {
        int y = st.top().first, x = st.top().second;
        st.pop();

        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i], ny = y + dy[i];

            if (nx < 0 || nx >= board[0].size() || ny < 0 || ny >= board.size())
                continue;

            if (board[ny][nx] != 1) return false;
        }
    }

    return true;
};

// board fill value
int fillBoard(vector<vector<int>> &game_board, int gx, int gy, int n, int m) {
    int cnt = 0;

    for (int y = 0; y < n; y++) {
        for (int x = 0; x < m; x++) {
            if (game_board[y + gy][x + gx] == 0) {
                game_board[y + gy][x + gx] = 1;
                cnt++;
            }
        }
    }

    return cnt;
};

int solution(vector<vector<int>> game_board, vector<vector<int>> table) {
    int answer = 0;
    int m = game_board.size();

    // 퍼즐 조각 dfs
    vector<vector<bool>> chk(m, vector<bool>(m, false));
    function<void(vector<pair<int, int>> & v, int x, int y)> getPart =
        [&](vector<pair<int, int>> &v, int x, int y) {
            chk[y][x] = true;
            v.push_back({y, x});

            for (int i = 0; i < 4; i++) {
                int nx = x + dx[i], ny = y + dy[i];

                if (nx < 0 || nx >= m || ny < 0 || ny >= m) continue;
                if (table[ny][nx] == 0 || chk[ny][nx]) continue;
                getPart(v, nx, ny);
            }
        };

    // 퍼즐 조각 0,0 기준으로 변환
    vector<vector<vector<int>>> parts;
    for (int y = 0; y < m; y++) {
        for (int x = 0; x < m; x++) {
            if (table[y][x] == 1 && chk[y][x] == false) {
                vector<pair<int, int>> tmp;
                getPart(tmp, x, y);

                int minY = INT_MAX, minX = INT_MAX, maxX = 0, maxY = 0;
                for (auto e : tmp) {
                    minY = min(minY, e.first);
                    minX = min(minX, e.second);
                    maxY = max(maxY, e.first);
                    maxX = max(maxX, e.second);
                }

                vector<vector<int>> part(maxY - minY + 1,
                                         vector<int>(maxX - minX + 1, 0));
                for (auto &e : tmp) {
                    int y = e.first - minY;
                    int x = e.second - minX;

                    part[y][x] = 1;
                }
                parts.push_back(part);
            }
        }
    }

    for (int i = 0; i < parts.size(); i++) {
        vector<vector<int>> v[4];
        v[0] = parts[i];
        for (int i = 1; i < 4; i++) {
            v[i] = rotateVector(v[i - 1]);
        }

        function<void(void)> checkPart = [&](void) {
            for (int z = 0; z < 4; z++) {
                int partN = v[z].size();
                int partM = v[z][0].size();

                for (int y = 0; y <= m - partN; y++) {
                    for (int x = 0; x <= m - partM; x++) {
                        if (isFit(v[z], game_board, x, y)) {
                            answer += fillBoard(game_board, x, y, partN, partM);
                            return;
                        }
                    }
                }
            }
        };

        checkPart();
    }

    return answer;
}
```
