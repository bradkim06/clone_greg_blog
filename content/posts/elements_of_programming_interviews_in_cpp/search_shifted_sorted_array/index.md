---
title: 문제11.3 환형으로 정렬된 배열에서 탐색하기
subTitle: search_shifted_sorted_array
category: algorithm
date: 2023-04-23T15:19:01
cover: ../cover.jpeg
---

# 문제

배열을 환형으로 시프트했을 때 정렬된 배열을 만들 수 있다면 해당 배열을 환형으로 정렬되었다고 한다. 예를 들어 Figure 1의 배열은 왼쪽으로 4번 시프트하면 정렬된 배열을 만들 수 있기 때문에 환형으로 정렬된 배열이다.

#### Figure 1

| 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 378 | 478 | 550 | 631 | 103 | 203 | 220 | 234 | 279 | 368 |

환형으로 정렬된 배열이 주어졌을 때 가장 작은 원소의 위치를 찾는 $O(logn)$ 알고리즘을 설계해 보라. 중복된 원소는 없다. Figure 1의 배열이 주어진다면 4를 반환해야 한다.

# 해답

```cpp
int SearchSmallest(const vector<int>& A) {
    int left = 0, right = A.size() - 1;

    while (right > left) {
        int mid = left + (right - left) / 2;

        if (A[mid] > A[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
}
```
