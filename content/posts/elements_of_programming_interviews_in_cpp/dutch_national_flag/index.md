---
title: 네덜란드 국기 문제
subTitle: dutch_national_flag
category: algorithm
date: 2023-04-20T14:14:46
cover: ../cover.jpeg
---

# 네덜란드 국기 문제란?

QuickSort는 Pivot을 기준으로 재배치를 재귀적으로 진행하는데 피벗의 선택에 따라 $O(n^2)$ 까지 복잡도가 증가한다.
한가지 해법으로 네덜란드 국기 문제와 같이 피벗보다 큰 원소, 작은원소, 같은원소를 재배열 하는 방법을 사용한다.

## 무식하게 풀기 $O(n^2)$

```cpp
void DutchFlagPartition(int pivot_index, vector<Color>* A_ptr) {
    vector<Color>& A = *A_ptr;
    Color pivot = A[pivot_index];

    // 첫 번째 단계: 피벗보다 작은 원소의 그룹을 구한다
    for (int i = 0; i < A.size(); ++i) {
        // 작은 원소를 찾는다
        for (int j = i + 1; j < A.size(); ++j) {
            if (A[j] < pivot) {
                swap(A[i], A[j]);
                break;
            }
        }
    }

    // 두 번째 단계: 피벗보다 큰 원소의 그룹을 구한다
    for (int i = A.size() - 1; i >= 0; --i) {
        // 큰 원소를 찾는다. 피벗보다 작은 원소에 맞닥뜨리게 되면 즉시 멈춘다
        // 윗 단계에서 이미 A의 앞쪽으로 옮겨졌기 때문
        for (int j = i - 1; j >= 0; --j) {
            if (A[j] > pivot) {
                swap(A[i], A[j]);
                break;
            }
        }
    }
}
```

## 마지막으로 추가한 위치에서 스왑하는 방법 $O(2n)$

```cpp
void DutchFlagPartition(int pivot_index, vector<Color>* A_ptr) {
    vector<Color>& A = *A_ptr;
    Color pivot = A[pivot_index];
    // 첫 번째 단계: 피벗보다 작은 원소 그룹을 구한다
    int smaller = 0;
    for (int i = 0; i < A.size(); ++i) {
        if (A[i] < pivot) swap(A[i], A[smaller++]);
    }

    // 두 번째 단계: 피벗보다 큰 원소의 그룹을 구한다
    int larger = A.size() - 1;
    for (int i = A.size() - 1; i >= 0; --i) {
        if (A[i] > pivot) swap(A[i], A[larger--]);
    }
}
```

## 미분류 원소 위치 추적 $O(n)$

```cpp
void DutchFlagPartition(int pivot_index, vector<Color>* A_ptr) {
    vector<Color>& A = *A_ptr;
    Color pivot = A[pivot_index];
    /**
     * 분류할 때마다 다음 불변식을 만족해야 한다
     * 피벗보다 작은 원소 그룹: A[0, smaller - 1]
     * 피벗과 같은 원소 그룹: A[smaller, equal - 1]
     * 미분류 원소 그룹: A[equal, larger - 1]
     * 피벗보다 큰 원소 그룹: A[larger, A.size() - 1]
     */
    int smaller = 0, equal = 0, larger = A.size();
    // 분류되지 않은 원소가 있는 동안 계속 순회한다
    while (equal < larger) {
        // A[equal]은 분류되지 않은 원소를 가리킨다
        if (A[equal] < pivot) {
            swap(A[smaller++], A[equal++]);
        } else if (A[equal] == pivot) {
            ++equal;
        } else {  // A[equal] > pivot
            swap(A[equal], A[--larger]);
        }
    }
}
```

##
