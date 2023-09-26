---
title: 문제15.5 멱집합 구하기
subTitle: power_set
category: algorithm
date: 2023-04-24T22:16:25
cover: ../cover.jpeg
---

# 문제

S의 멱집합(power set)은 S의 공집합과 S를 포함한 모든 부분 집합과 같다. 집합이 입력으로 주어졌을 때 멱집합을 반환하는 함수를 작성하라.

# 해답

조합의 모든 가지수를 반환하면 된다. 시간 $O(n2^n)$, 공간 $O(n2^n)$

```cpp
vector<vector<int>> GeneratePowerSet(const vector<int> &input_set) {
    vector<vector<int>> power_set;

    // Generate all subsets whose intersection with input_set[0], ...,
    // input_set[to_be_selected - 1] is exactly selected_so_far.
    function<void(int, vector<int> *)> DirectedPowerSet =
        [&](int to_be_selected, vector<int> *selected_so_far) -> void {
        if (to_be_selected == input_set.size()) {
            power_set.emplace_back(*selected_so_far);
            return;
        }
        // Generate all subsets that contain input_set[to_be_selected].
        selected_so_far->emplace_back(input_set[to_be_selected]);
        DirectedPowerSet(to_be_selected + 1, selected_so_far);
        // Generate all subsets that do not contain
        // input_set[to_be_selected].
        selected_so_far->pop_back();
        DirectedPowerSet(to_be_selected + 1, selected_so_far);
    };

    DirectedPowerSet(0, make_unique<vector<int>>().get());
    return power_set;
}
```

## Bit Manipulation

```cpp
vector<vector<int>> GeneratePowerSet(const vector<int> &input_set) {
    vector<vector<int>> power_set;
    for (int int_for_subset = 0; int_for_subset < (1 << input_set.size());
         ++int_for_subset) {
        int bit_array = int_for_subset;
        vector<int> subset;

        while (bit_array) {
            subset.emplace_back(input_set[log2(bit_array & ~(bit_array - 1))]);
            bit_array &= bit_array - 1;
        }
        power_set.emplace_back(subset);
    }
    return power_set;
}
```
