---
title: 문제13.1 정렬된 두 배열의 교집합 구하기
subTitle: intersect_sorted_arrays
category: algorithm
date: 2023-04-24T10:28:43
cover: ../cover.jpeg
---

일반적인 검색 엔진은 역 인덱스를 사용해서 입력으로 주어진 단어와 매치되는 문서들을 찾는다. 각 문서에는 해당 문서를 식별할 수 있는 고유한 문서 ID가 주어진다. 역 인덱스는 단어 w가 포함된 문서 ID를 정렬된 순서로 반환한다. 정렬 순서는 검색 알고리즘에 따라 다를 것이다. 예를 들면 Page Rank가 감소하는 순서가 될 수도 있다. 검색 엔진은 여러 개의 단어가 쿼리로 주어졌을 때 각 단어별로 정렬된 문서 배열을 찾은 뒤 배열 사이의 교집합을 구해서 모든 단어를 포함하는 문서를 찾는다. 여기서 가장 계산 집약적인 단계는 정렬된 배열의 교집합을 찾는 부분이다.

# 문제

정렬된 배열 두 개가 주어졌을 때, 두 배열에 동시에 존재하는 원소를 새로운 배열 형태로 반환하라. 입력 배열에는 원소가 중복해서 나타날 수 있지만, 반환되는 배열에선 원소가 중복되면 안 된다. 예를 들어 입력이 <2,3,3,5,5,6,7,7,8,12> 와 <5,5,6,8,8,9,10,10>이라면 결과는 <5,6,8>이 되어야 한다.

# 해답

## 무식한 방법 loop join $O(nm)$

m,n 두 배열의 길이

```cpp
vector<int> IntersectTwoSortedArrays(const vector<int>& A,
                                     const vector<int>& B) {
    vector<int> intersection_A_B;

    for (int i = 0; i < A.size(); ++i) {
        if (i && A[i] == A[i - 1]) continue;

        if (find(begin(B), end(B), A[i]) != end(B)) {
            intersection_A_B.emplace_back(A[i]);
        }
    }

    return intersection_A_B;
}
```

## 이진 탐색 $O(nlogm)$

```cpp
vector<int> IntersectTwoSortedArrays(const vector<int>& A,
                                     const vector<int>& B) {
    vector<int> intersection_A_B;

    for (int i = 0; i < A.size(); ++i) {
        if (i && A[i] == A[i - 1]) continue;

        if (binary_search(B.cbegin(), B.cend(), A[i])) {
            intersection_A_B.emplace_back(A[i]);
        }
    }

    return intersection_A_B;
}
```

## 두 배열의 길이가 비슷한 경우 최적화 $O(n+m)$

```cpp
vector<int> IntersectTwoSortedArrays(const vector<int>& A,
                                     const vector<int>& B) {
    vector<int> insersection_A_B;

    for (int i = 0, j = 0; i < A.size() && j < B.size();) {
        if (A[i] == B[j] && (!i || A[i] != A[i - 1])) {
            insersection_A_B.emplace_back(A[i]);
            i++, j++;
            continue;
        }

        A[i] < B[j] ? i++ : j++;
    }

    return insersection_A_B;
}
```
