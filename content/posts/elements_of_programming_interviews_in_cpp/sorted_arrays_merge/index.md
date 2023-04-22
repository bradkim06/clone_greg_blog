---
title: 문제10.1 정렬된 파일 합치기
subTitle: sorted_arrays_merge
category: algorithm
date: 2023-04-22T17:53:59
cover: ../cover.jpeg
---

500개의 파일이 주어져 있다. 이 파일에는 S&P 500회사의 주식 거래 정보가 들어 있다. 각 거래 정보는 한 줄에 1232111, AAPL, 30, 456.12의 형태로 작성되어 있다.

첫번째 숫자(1232111)는 그날 거래를 시작한 이후 걸린 시간을 ms로 표현한 값이다. 각 파일의 각 줄은 시간 순서대로 정렬되어 있다. 여러분은 500개의 파일에 나와 있는 거래 정보를 시간 순서대로 정렬해서 하나의 파일로 작성하려고 한다. 각 파일의 크기는 대략 5 ~ 100 MB이고, 이들을 모두 합친 파일의 크기는 대략 5 GB다.

정렬된 시퀀스의 집합이 입력으로 주어졌을 때, 이들을 하나의 정렬된 시퀀스로 합치는 프로그램을 작성하라. 예를 들어 <3,5,7>, <0,6>, <0,6,28>이 입력으로 주어진다면, 결과는 <0,0,3,5,6,6,7,28>이 된다.

## 무식하게 해결하기

이렇게 해도 해결은 되지만 `각 파일의 각 줄이 시간 순서대로 정렬`되어 있는 것을 활용하지 못한다. $O(nlogn)$

```cpp
vector<int> MergeSortedArrays(const vector<vector<int>>& sorted_arrays) {
    vector<int> result;
    for (const vector<int>& arr : sorted_arrays) {
        for (int n : arr) result.emplace_back(n);
    }

    sort(result.begin(), result.end());
    return result;
}
```

## 각 시퀀스의 첫 번째 원소를 뽑아내기

각 시퀀스는 정렬되어 있으므로 첫번째 원소가 가장 작은것만 순서대로 뽑아내면 된다. $O(nlogk)$ k:파일 개수

```cpp
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
