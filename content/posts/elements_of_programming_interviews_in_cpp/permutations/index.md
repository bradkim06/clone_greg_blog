---
title: 문제15.4 순열 구하기
subTitle: permutations
category: algorithm
date: 2023-04-24T21:03:44
cover: ../cover.jpeg
---

# 문제

중복된 정수가 없는 배열이 입력으로 주어졌을 때, 모든 가능한 순열을 나열하는 프로그램을 작성하라. 같은 순열이 등장하면 안된다.

## 해답

### Recursive

```cpp
vector<vector<int>> Permutations(vector<int> A) {
    vector<vector<int>> result;

    function<void(int depth)> dfs = [&](int depth) {
        if (depth == A.size() - 1) {
            result.emplace_back(A);
            return;
        }

        for (int i = depth; i < A.size(); i++) {
            swap(A[depth], A[i]);
            dfs(depth + 1);
            swap(A[i], A[depth]);
        }
    };

    dfs(0);

    return result;
}
```

### STL next_permutation

```cpp
vector<vector<int>> Permutations(vector<int> A) {
    vector<vector<int>> result;

    sort(A.begin(), A.end());
    do {
        result.emplace_back(A);
    } while (next_permutation(A.begin(), A.end()));

    return result;
}
```

## 경우의 수

```cpp
#include <bits/stdc++.h>

using namespace std;

void permutation(int n, vector<int> v) {
    sort(v.begin(), v.end());
    cout << "입력 " << v << endl;
    cout << "경우의 수 " << n << endl;

    // 순열: 순서O, 중복X
    cout << "순열 출력" << endl;
    function<void(vector<int> *, deque<bool> *)> permutation =
        [&](vector<int> *partial, deque<bool> *visited) {
            if (partial->size() == n) {
                cout << *partial << endl;
                return;
            }

            for (int i = 0; i < v.size(); i++) {
                if ((*visited)[i]) continue;

                (*visited)[i] = true;
                partial->emplace_back(v[i]);
                permutation(partial, visited);
                partial->pop_back();
                (*visited)[i] = false;
            }
        };

    permutation(make_unique<vector<int>>().get(),
                make_unique<deque<bool>>(v.size(), false).get());

    // 중복 순열: 순서O, 중복O
    cout << "중복 순열 출력" << endl;
    function<void(int, vector<int> *)> duplicatePermutation =
        [&](int depth, vector<int> *partial) {
            if (partial->size() == n) {
                cout << *partial << endl;
                return;
            }

            for (int i = 0; i < v.size() && depth < v.size(); i++) {
                partial->emplace_back(v[i]);
                duplicatePermutation(depth + 1, partial);
                partial->pop_back();
            }
        };

    duplicatePermutation(0, make_unique<vector<int>>().get());

    // 조합: 순서X 중복X
    cout << "조합 출력" << endl;
    function<void(int, vector<int> *)> Combination = [&](int depth,
                                                         vector<int> *partial) {
        if (partial->size() == n) {
            cout << *partial << endl;
            return;
        }

        for (int i = depth; i < v.size(); i++) {
            partial->emplace_back(v[i]);
            Combination(i + 1, partial);
            partial->pop_back();
        }
    };

    Combination(0, make_unique<vector<int>>().get());

    // 중복조합: 순서X 중복O
    cout << "중복 조합 출력" << endl;
    function<void(int, vector<int> *)> duplicateCombination =
        [&](int depth, vector<int> *partial) {
            if (partial->size() == n) {
                cout << *partial << endl;
                return;
            }

            for (int i = depth; i < v.size(); i++) {
                partial->emplace_back(v[i]);
                duplicateCombination(i, partial);
                partial->pop_back();
            }
        };

    duplicateCombination(0, make_unique<vector<int>>().get());
}

int main(void) { permutation(3, {1, 2, 3}); }
```

