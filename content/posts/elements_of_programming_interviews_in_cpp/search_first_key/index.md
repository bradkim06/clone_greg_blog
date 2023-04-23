---
title: 문제11.1 정렬된 배열에서 k가 첫 번째로 등장한 위치 찾기
subTitle: search_first_key
category: algorithm
date: 2023-04-23T12:33:47
cover: ../cover.jpeg
---

# 문제

정렬된 배열에서 찾고자 하는 키가 주어졌을 때, 해당 키가 첫 번째로 등장하는 배열의 인덱스를 찾는 메서드를 작성하라. 찾는 키가 없다면 -1을 반환한다. 예를 들어 Figure 1의 배열에 주어진 키값이 108이면 3을 반환해야 한다. 주어진 키가 285라면 6을 반환한다.

##### Figure 1

| 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| -14 | -10 | 2   | 108 | 108 | 243 | 285 | 285 | 285 | 401 |

# 해답

```cpp
int SearchFirstOfK(const vector<int>& A, int k) {
    int left = 0, right = A.size() - 1, result = -1;

    while (right >= left) {
        // (right+left)/2는 오버플로우의 가능성이 있다
        int mid = left + (right - left) / 2;
        if (A[mid] > k) {
            right = mid - 1;
        } else if (A[mid] == k) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return result;
}
```

## 응용1

정렬된 배열과 키가 주어졌을 때 키값보다 큰 원소가 처음으로 등장한 인덱스를 찾는 효율적인 알고리즘을 설계하라 예를 들어 Figure 1의 배열에서 키값이 285로 주어지면 9를 반환해야 한다. 주어진 키값이 -13이면 1을 반환한다.

```cpp lineNumbers=true {8,11}
int SearchFirstOfK(const vector<int>& A, int k) {
    int left = 0, right = A.size() - 1, result = -1;

    while (right >= left) {
        // (right+left)/2는 오버플로우의 가능성이 있다
        int mid = left + (right - left) / 2;
        if (A[mid] > k) {
            result = mid;
            right = mid - 1;
        } else if (A[mid] == k) {
            left = mid + 1;
        } else {
            left = mid + 1;
        }
    }

    return result;
}
```

## 응용2

배열 A에 정렬되지 않은 정수가 n개 들어 있다고 가정하자. 이 배열은 $A[0] >= A[1]$과 $A[n-2] <= A[n-1]$을 만족한다.
A[i]가 이웃한 원소들보다 크기가 작거나 같으면 인덱스 i를 지역 최적해(local minimum)라 한다. 지역 최적해가 항상 존재한다고 가정햇을 때, 어떻게 하면 효율적으로 찾을 수 있을까?

```cpp
#include <assert.h>
#include <bits/stdc++.h>
using namespace std;

// {1}, {2,2}와 같은 예외적인 케이스는 입력되지 않으므로 고려하지 않는다.
int SearchLocalMinimum(vector<int>& A, int left, int right) {
    int mid = left + (right - left) / 2;

    if ((A[mid - 1] >= A[mid]) && (A[mid + 1] >= A[mid])) {
        return mid;
    } else if (mid > 1) {
        return SearchLocalMinimum(A, left, (mid - 1));
    }

    return SearchLocalMinimum(A, (mid + 1), right);
}

int main() {
    vector<vector<int>> testCase{{5, 5, 3, 6, 13, 16, 19},
                                 {9, 7, 2, 8, 5, 6, 3, 4},
                                 {9, 6, 3, 14, 5, 7, 9},
                                 {23, 8, 15, 2, 3},
                                 {3, 2, 2, -1, 6}};
    vector<int> expect{2, 2, 2, 1, 1, 0};

    for (int i = 0; i < testCase.size(); i++) {
        cout << SearchLocalMinimum(testCase[i], 0, testCase[i].size() - 1)
             << ' ';
        assert(SearchLocalMinimum(testCase[i], 0, testCase[i].size() - 1) ==
               expect[i]);
    }
    return 0;
}
```

## 응용3

정수값이 정렬된 배열 A와 정수값 k가 주어졌을 때, k를 에워싸는 구간을 반환하는 프로그램을 작성하라. 예를 들어 한 쌍의 정수값 L과 U가 있을 때, L은 k가 배열 A에서 처음으로 등장하는 위치를 나타내고, U는 k가 배열 A에서 마지막으로 등장하는 위치를 나타낸다. k가 A에 없을 때는 [-1,-1]을 반환하면 된다. 예를 들어 A = <1,2,2,4,4,4,7,11,11,13>이고 k=11이면, [7,8]을 반환해야 한다.

```cpp
#include <bits/stdc++.h>
using namespace std;

int SearchK(const vector<int>& A, int k, bool isFirst) {
    int left = 0, right = A.size() - 1, result = -1;

    while (right >= left) {
        int mid = left + (right - left) / 2;
        if (A[mid] > k) {
            right = mid - 1;
        } else if (A[mid] == k) {
            result = mid;
            if (isFirst) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            left = mid + 1;
        }
    }

    return result;
}

vector<int> SearchFirstLastK(const vector<int>& A, int k) {
    vector<int> result{-1, -1};
    result[0] = SearchK(A, k, true);
    if (result[0] == -1) return result;
    result[1] = SearchK(A, k, false);
    return result;
}

int main() {
    vector<vector<int>> testCase{{1, 2, 2, 4, 4, 4, 7, 11, 11, 13}};
    for (auto e : SearchFirstLastK(testCase[0], 11)) cout << e << ' ';
    for (auto e : SearchFirstLastK(testCase[0], 9)) cout << e << ' ';

    return 0;
}
```

## 응용4

p가 정렬된 문자열 배열의 접두사인지 확인하는 프로그램을 작성하라

`TODO`
