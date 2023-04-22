---
title: 문제10.2 증가했다가 감소하는 배열 정렬하기
subTitle: sort_increasing_decreasing_array
category: algorithm
date: 2023-04-22T20:26:35
cover: ../cover.jpeg
---

배열의 원소가 특정 인덱스까지 증가했다가 감소하고 다시 증가하는 과정이 k번 반복된다면 이 배열을 k-증가-감소라 한다. k-증가-감소 배열을 정렬하는 효율적인 알고리즘을 설계하라.

Figure 1. 4-증가-감소 배열

| +   | +   | +   | -   | -   | +   | +   | +   | -   | -   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 57  | 131 | 493 | 294 | 221 | 339 | 418 | 452 | 442 | 190 |

##### $O(nlogk)$

```cpp lineNumbers=true {3-23}
vector<int> MergeSortedArrays(const vector<vector<int>>& sorted_arrays);

vector<int> SortKIncreasingDecreasingArray(const vector<int>& A) {
    vector<vector<int>> sorted_subarrays;

    bool isIncreasing = A[1] >= A[0];
    int start = 0, len = A.size();
    for (int i = 1; i <= len; i++) {
        if (i == len || (A[i] >= A[i - 1] && !isIncreasing) ||
            (A[i] < A[i - 1] && isIncreasing)) {
            if (isIncreasing) {
                sorted_subarrays.emplace_back(A.begin() + start, A.begin() + i);
            } else {
                sorted_subarrays.emplace_back(A.rbegin() + len - i,
                                              A.rbegin() + len - start);
            }
            start = i;
            isIncreasing ^= true;
        }
    }

    return MergeSortedArrays(sorted_subarrays);
}

vector<int> MergeSortedArrays(const vector<vector<int>>& sorted_arrays) {
    struct IteratorCurrentAndEnd {
        bool operator<(const IteratorCurrentAndEnd& that) const {
            return *current > *that.current;
        }

        vector<int>::const_iterator current, end;
    };
    priority_queue<IteratorCurrentAndEnd> min_heap;

    for (const vector<int>& sorted_array : sorted_arrays) {
        if (!sorted_array.empty()) {
            min_heap.push({cbegin(sorted_array), cend(sorted_array)});
        }
    }

    vector<int> result;
    while (!min_heap.empty()) {
        auto [current, end] = min_heap.top();
        min_heap.pop();
        result.emplace_back(*current);
        if (next(current) != end) {
            min_heap.push({next(current), end});
        }
    }
    return result;
}
```
