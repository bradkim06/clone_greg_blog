---
title: 문제 5.18 2차원 배열에 나선형으로 원소 배치하기
subTitle: spiral_ordering
category: algorithm
date: 2023-04-21T12:34:03
cover: ../cover.jpeg
---

n\*n 크기의 2차원 배열이 주어졌을 때, 이 배열을 나선형으로 읽은 결과를 반환하는 프로그램을 작성하라

```cpp
vector<int> MatrixInSpiralOrder(vector<vector<int>> square_matrix) {
    const array<array<int, 2>, 4> kShift = {{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}};
    int dir = 0, x = 0, y = 0;
    vector<int> spiral_ordering;
    int len = square_matrix.size();
    for (int i = 0; i < len * len; i++) {
        spiral_ordering.emplace_back(square_matrix[x][y]);
        square_matrix[x][y] = 0;
        int next_x = x + kShift[dir][0], next_y = y + kShift[dir][1];
        if (next_x < 0 || next_x >= len || next_y < 0 || next_y >= len ||
            square_matrix[next_x][next_y] == 0) {
            dir = (dir + 1) % 4;
            next_x = x + kShift[dir][0], next_y = y + kShift[dir][1];
        }
        x = next_x, y = next_y;
    }
    return spiral_ordering;
}
```

## 응용1: d가 주어졌을 때 <1,2,3,4,5,6,7,8,9>을 나선형으로 표현하는 d \* d 2차원 배열을 구하는 프로그램을 작성하라.

```cpp
#include <bits/stdc++.h>
using namespace std;

template <class T>
std::ostream& operator<<(std::ostream& stream, const std::vector<T>& values) {
    copy(begin(values), end(values), std::ostream_iterator<T>(stream, " "));
    return stream;
}

vector<vector<int>> MatrixInSpiralOrder(vector<int> square_matrix) {
    const array<array<int, 2>, 4> kShift = {{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}};
    int dir = 0, x = 0, y = 0;
    int len = sqrt(square_matrix.size());
    vector<vector<int>> spiral_ordering(len, vector<int>(len, 0));
    for (int i = 0; i < len * len; i++) {
        spiral_ordering[x][y] = square_matrix[i];
        int next_x = x + kShift[dir][0], next_y = y + kShift[dir][1];
        if (next_x < 0 || next_x >= len || next_y < 0 || next_y >= len ||
            spiral_ordering[next_x][next_y] != 0) {
            dir = (dir + 1) % 4;
            next_x = x + kShift[dir][0], next_y = y + kShift[dir][1];
        }
        x = next_x, y = next_y;
    }
    return spiral_ordering;
}

int main() {
    vector<int> v(9);
    iota(v.begin(), v.end(), 1);

    for (auto e : MatrixInSpiralOrder(v)) cout << e << "\n";
}
```

## 응용: m\*n 크기의 2차원 배열 A의 원소를 나선형으로 나열하라

```cpp
#include <bits/stdc++.h>
using namespace std;

template <class T>
std::ostream& operator<<(std::ostream& stream, const std::vector<T>& values) {
    copy(begin(values), end(values), std::ostream_iterator<T>(stream, " "));
    return stream;
}

vector<vector<int>> MatrixInSpiralOrder(vector<vector<int>> square_matrix) {
    const array<array<int, 2>, 4> kShift = {{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}};
    int dir = 0, x = 0, y = 0;
    int m = square_matrix.size(), n = square_matrix[0].size();
    vector<vector<int>> spiral_ordering(m, vector<int>(n, 0));
    for (int i = 0; i < m * n; i++) {
        spiral_ordering[x][y] = square_matrix[i / n][i % n];
        int next_x = x + kShift[dir][0], next_y = y + kShift[dir][1];
        if (next_x < 0 || next_x >= m || next_y < 0 || next_y >= n ||
            spiral_ordering[next_x][next_y] != 0) {
            dir = (dir + 1) % 4;
            next_x = x + kShift[dir][0], next_y = y + kShift[dir][1];
        }
        x = next_x, y = next_y;
    }
    return spiral_ordering;
}

int main() {
    int m, n;
    cin >> m >> n;
    vector<vector<int>> v(m, vector<int>(n, 0));
    int start = 1;
    for (int i = 0; i < v.size(); i++) {
        iota(v[i].begin(), v[i].end(), start);
        start += v[0].size();
    }

    for (auto e : MatrixInSpiralOrder(v)) cout << e << endl;
}
```

## 응용: m\*n크기의 2차원 배열 A를 나선형으로 나열했을 때 k번째 원소가 무엇인지 $O(1)$ 시간에 찾아보라

```cpp
int getSpiralValue(vector<vector<int>> spiral, int k) {
    return spiral[(k - 1) / spiral[0].size()][(k - 1) % spiral[0].size()];
}
```
