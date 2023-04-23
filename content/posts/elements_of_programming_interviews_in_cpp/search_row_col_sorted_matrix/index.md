---
title: 문제11.6 정렬된 2차원 배열에서 탐색하기
subTitle: search_row_col_sorted_matrix
category: algorithm
date: 2023-04-23T16:29:30
cover: ../cover.jpeg
---

# 문제

2차원 배열에서 행과 열의 원소값이 감소하지 않는다면 정렬되어 있다고 하자. Figure 1은 정렬된 2차원 배열이다.

#### Figure 1

|     | C0  | C1  | C2  | C3  | C4  |
| --- | --- | --- | --- | --- | --- |
| R0  | -1  | 2   | 4   | 4   | 6   |
| R1  | 1   | 5   | 5   | 9   | 21  |
| R2  | 3   | 6   | 6   | 9   | 22  |
| R3  | 3   | 6   | 8   | 10  | 24  |
| R4  | 6   | 8   | 9   | 12  | 25  |
| R5  | 8   | 10  | 12  | 13  | 40  |

정렬된 2차원 배열과 임의의 숫자가 주어졌을 때, 해당 숫자가 배열에 존재하는지 확인하는 알고리즘을 설계하라. 예를 들어 Figure 1 배열과 숫자 7이 입력되면 false를 반환해야 한다. 숫자 8이 입력되면 true를 반환한다.

# 해답

```cpp
bool MatrixSearch(const vector<vector<int>>& A, int x) {
    int row = 0, col = A[0].size() - 1;
    // Keeps searching while there are unclassified rows and columns.
    while (row < A.size() && col >= 0) {
        if (x == A[row][col])
            return true;
        else if (x > A[row][col]) {
            row++;
        } else {
            col--;
        }
    }

    return false;
}
```
