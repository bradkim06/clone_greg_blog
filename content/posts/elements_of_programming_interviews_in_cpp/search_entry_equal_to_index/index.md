---
title: 문제11.2 정렬된 배열에서 인덱스와 값이 같은 엔트리 찾기
subTitle: search_entry_equal_to_index
category: algorithm
date: 2023-04-23T15:02:31
cover: ../cover.jpeg
---

# 문제

원소가 중복되지 않고 정렬되어 있는 배열이 주어졌을 때, 인덱스 i의 값이 i와 같은 원소를 반환하는 효율적인 알고리즘을 설계하라. 예를 들어 입력이 <-2,0,2,3,6,7,9>로 주어진다면, 2 혹은 3을 반환해야 한다.

# 해법

정렬된 배열에 중복이 없으므로 $A[j] > j$면 j이후의 원소는 오답이다.

```cpp
int SearchEntryEqualToItsIndex(const vector<int>& A) {
    int left = 0, right = A.size() - 1, result = -1;

    while (right >= left) {
        int mid = left + (right - left) / 2;

        if (A[mid] == mid) {
            return mid;
        } else if (A[mid] > mid) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return result;
}
```

## 응용

배열 A가 정렬되어 있지만 중복된 값을 포함할때 풀어보라

```cpp
int SearchDuplicateEntryEqualToItsIndex(const vector<int>& A) {
    int left = 0, right = A.size() - 1, result = -1;

    while (right >= left) {
        int mid = left + (right - left) / 2;

        if (A[mid] == mid) {
            return mid;
        } else if (A[mid] < mid) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return result;
}
```
