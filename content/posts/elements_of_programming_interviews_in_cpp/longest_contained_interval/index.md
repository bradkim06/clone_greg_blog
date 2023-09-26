---
title: 문제12.9 가장 긴 구간의 길이 찾기
subTitle: longest_contained_interval
category: algorithm
date: 2023-04-23T23:04:13
cover: ../cover.jpeg
---

# 문제

정수 배열이 입력으로 주어졌을 때, 다음 조건을 만족하는 가장 긴 부분 집합의 길이를 반환하는 프롣그램을 작성하라. 어떤 부분 집합에서 임의의 두 정수를 선택햇을 때, 두 정수 사이의 모든 정수가 해당 부분 집합에 존재해야 한다. 예를 들어 <3,-2,7,9,8,1,2,0,-1,5,8>이 입력으로 주어지면, 이 조건을 만족하는 가장 긴 부분 집합은 {-2,-1,0,1,2,3}이므로 6을 반환한다.

# 해답

## 무식한 방법

배열을 정렬한 뒤 하나씩 차례대로 순회하면서 조건에 맞는지 확인한 후 가장 긴 부분 집합의 길이를 구하면 된다.

```cpp
int LongestContainedRange(const vector<int>& A) {
    int max_interval_size = 0, curr_interval_size = 1;
    vector<int> v(A);
    sort(v.begin(), v.end());
    v.erase(unique(v.begin(), v.end()), v.end());

    for (int i = 1; i < v.size(); i++) {
        if (v[i] - v[i - 1] == 1) {
            curr_interval_size++;
            continue;
        }

        max_interval_size = max(max_interval_size, curr_interval_size);
        curr_interval_size = 1;
    }

    return max(max_interval_size, curr_interval_size);
}
```

## 더 나은 방법

연속한 숫자가 순서대로 나타날 필요없이 존재하기만 하면 되므로 해시를 이용해 해결한다.
입력된 숫자를 하나씩 뽑아내고 앞뒤에 값이 존재하는지 확인하면 된다.

```cpp
int LongestContainedRange(const vector<int>& A) {
    // unprocessed_entries records the existence of each entry in A.
    unordered_set<int> unprocessed_entries(begin(A), end(A));

    int max_interval_size = 0;
    while (!unprocessed_entries.empty()) {
        int a = *begin(unprocessed_entries);
        unprocessed_entries.erase(a);

        // Finds the lower bound of the largest range containing a.
        int lower_bound = a - 1;
        while (unprocessed_entries.count(lower_bound)) {
            unprocessed_entries.erase(lower_bound);
            --lower_bound;
        }

        // Finds the upper bound of the largest range containing a.
        int upper_bound = a + 1;
        while (unprocessed_entries.count(upper_bound)) {
            unprocessed_entries.erase(upper_bound);
            ++upper_bound;
        }

        max_interval_size =
            max(max_interval_size, upper_bound - lower_bound - 1);
    }
    return max_interval_size;
}
```
