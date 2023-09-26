---
title: 문제15.3 n개의 퀸이 서로 공격하지 못하는 상황을 모두 나열하기
subTitle: n_queens
category: algorithm
date: 2023-04-24T21:00:26
cover: ../cover.jpeg
---

# 문제

입력으로 n이 주어졌을 때, n\*n 크기의 체스판에 n개의 퀸이 안전하게 놓이는 모든 가능한 경우의 수를 반환하라

# 해답

```cpp
#include <bits/stdc++.h>

using namespace std;

// 새로운 위치에 놓인 퀸이 기존에 있던 다른 퀸들에서 잡아먹히는 상황이 나오는지
// 확인한다.
bool IsValid(const vector<int>& col_placement) {
    int row_id = col_placement.size() - 1;
    for (int i = 0; i < row_id; ++i) {
        int diff = abs(col_placement[i] - col_placement[row_id]);
        if (diff == 0 || diff == row_id - i) {
            // 열 또는 대각선 제약 조건 위반
            return false;
        }
    }
    return true;
}

void SolveNQueens(int n, int row, vector<int>* col_placement,
                  vector<vector<int>>* result) {
    if (row == n) {
        // 모든 퀸을 놓을 수 있다.
        result->emplace_back(*col_placement);
        return;
    }

    for (int col = 0; col < n; ++col) {
        col_placement->emplace_back(col);
        if (IsValid(*col_placement)) {
            SolveNQueens(n, row + 1, col_placement, result);
        }
        col_placement->pop_back();
    }
}

vector<vector<int>> NQueens(int n) {
    vector<vector<int>> result;
    SolveNQueens(n, 0, make_unique<vector<int>>().get(), &result);
    return result;
}

int main() {
    int n;
    cin >> n;

    cout << NQueens(n).size() << endl;

    return 0;
}
```
