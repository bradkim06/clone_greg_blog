---
title: 문제15.1 하노이 타워 문제
subTitle: hanoi
category: algorithm
date: 2023-04-24T20:18:50
cover: ../cover.jpeg
---

# 문제

하노이 타워 문제에서 고리를 옮기는 과정을 차례대로 출력하는 프로그램을 작성하라.

# 해답

```cpp
#include <bits/stdc++.h>
using namespace std;

const int kNumPegs = 3;

vector<vector<int>> ComputeTowerHanoi(int num_rings) {
    array<stack<int>, kNumPegs> pegs;
    // Initialize pegs.
    for (int i = num_rings; i >= 1; --i) {
        pegs[0].push(i);
    }

    vector<vector<int>> result;
    function<void(int num_rings_to_move, int from, int to, int use)>
        ComputeTowerHanoiSteps = [&](int num_rings_to_move, int from, int to,
                                     int use) {
            if (num_rings_to_move > 0) {
                ComputeTowerHanoiSteps(num_rings_to_move - 1, from, use, to);
                pegs[to].push(pegs[from].top());
                pegs[from].pop();
                int a = pegs[0].size(), b = pegs[1].size(), c = pegs[2].size();
                result.emplace_back(
                    vector<int>{num_rings_to_move, from, to, a, b, c});
                ComputeTowerHanoiSteps(num_rings_to_move - 1, use, to, from);
            }
        };

    ComputeTowerHanoiSteps(num_rings, 0, 1, 2);
    return result;
}

int main() {
    auto res = ComputeTowerHanoi(3);
    for (auto e : res) {
        int ring_num = e[0], from = e[1], to = e[2];
        int a = e[3], b = e[4], c = e[5];
        printf("'ring %d move %d to %d' current tower status: %d %d %d\n",
               ring_num, from, to, a, b, c);
    }

    return 0;
}
```
