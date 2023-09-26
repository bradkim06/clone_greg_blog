---
title: 문제15.6 크기가 k인 모든 부분 집합 생성하기
subTitle: combinations
category: algorithm
date: 2023-04-24T23:19:22
cover: ../cover.jpeg
---

# 문제

k와 n이 입력으로 주어졌을 때, {1,2,...,n}의 부분 집합 중에서 크기가 k인 모든 부분 집합을 구하는 프로그램을 작성하라. 예를 들어 k=2이고 n=5일때 그 결과는 {{1,2},{1,3},{1,4},{1,5},{2,3},{2,4},{2,5},{3,4},{3,5},{4,5}가 된다.

# 해답

```cpp
vector<vector<int>> Combinations(int n, int k) {
    vector<vector<int>> result;

    function<void(int, vector<int> *)> Combination = [&](int depth,
                                                         vector<int> *partial) {
        if (partial->size() == k) {
            result.emplace_back(*partial);
            return;
        }

        for (int i = depth; i <= n; i++) {
            partial->emplace_back(i);
            Combination(i + 1, partial);
            partial->pop_back();
        }
    };

    Combination(1, make_unique<vector<int>>().get());

    return result;
}
```

## EPI Solution

TODO. num_remaining을 검사 해야되는 Case?

```cpp
void DirectedCombinations(int n, int k, int offset,
                          vector<int>* partial_combination,
                          vector<vector<int>>* result) {
    if (size(*partial_combination) == k) {
        result->emplace_back(*partial_combination);
        return;
    }

    // Generate remaining combinations over {offset, ..., n - 1} of size
    // num_remaining.
    const int num_remaining = k - size(*partial_combination);
    for (int i = offset; i <= n && num_remaining <= n - i + 1; ++i) {
        partial_combination->emplace_back(i);
        DirectedCombinations(n, k, i + 1, partial_combination, result);
        partial_combination->pop_back();
    }
}

vector<vector<int>> Combinations(int n, int k) {
    vector<vector<int>> result;
    DirectedCombinations(n, k, 1, make_unique<vector<int>>().get(), &result);
    return result;
}
```
