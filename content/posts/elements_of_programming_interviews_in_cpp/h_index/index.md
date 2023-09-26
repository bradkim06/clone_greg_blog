---
title: 문제13.3 H-Index 계산하기
subTitle: h_index
category: algorithm
date: 2023-04-24T11:22:26
cover: ../cover.jpeg
---

# 문제

양의 정수 배열이 주어졌을 때, 배열에 h보다 크거나 같은 항목이 적어도 h개 이상 있는 가장 큰 h를 찾으라.

# 해답

$O(nlogn)$

## 인용횟수가 많은 수 부터 탐색

```cpp
int HIndex(vector<int> citations) {
    sort(begin(citations), end(citations), greater<>());
    for (int i = 0; i < citations.size(); ++i) {
        if (citations[i] < i + 1) return i;
    }
    return citations.size();
}
```

## 인용횟수가 작은 수 부터 탐색

```cpp
int HIndex(vector<int> citations) {
    sort(begin(citations), end(citations));
    const int n = citations.size();
    for (int i = 0; i < citations.size(); ++i) {
        if (citations[i] >= n - i) {
            return n - i;
        }
    }
    return 0;
}
```

## 이진 탐색으로 효율 증가

```cpp
int HIndex(vector<int> citations) {
    sort(citations.begin(), citations.end(), greater<>());

    int hIndex = 0, left = 0, right = citations.size() - 1;
    while (right >= left) {
        int mid = left + (right - left) / 2;
        if (citations[mid] >= mid + 1) {
            left = mid + 1;
            hIndex = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return hIndex;
}
```
