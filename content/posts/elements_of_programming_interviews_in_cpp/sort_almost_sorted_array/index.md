---
title: 문제10.3 거의 정렬된 배열 정렬하기
subTitle: sort_almost_sorted_array
category: algorithm
date: 2023-04-22T21:03:03
cover: ../cover.jpeg
---

# 문제

완벽하지는 않지만 대부분 정렬된 상태의 데이터를 다루는 경우가 종종 있다. 예를 들어 서버에 시간 정보가 찍힌 주식 자료가 들어오는 경우에 서버의 부하 정도와 네트워크의 경로에 따라서 시간순으로 이전 주식 자료가 다른 자료보다 살짝 늦게 들어올 수 있다. 여기서는 이러한 데이터를 효율적으로 정렬하는 문제를 다룰 것이다.

굉장히 길이가 긴 수열이 입력으로 주어졌을 때 이를 정렬된 순서로 출력하는 프로그램을 작성하라. 각 숫자의 위치는 정렬되었을 때의 위치보다 최대 k만큼 떨어져 있다(이런 배열을 k-정렬된 배열이라 한다) 예를 들어 <3,-1,2,6,4,5,8>의 각 요소는 최종 정렬된 숫자 위치보다 최대 2만큼 떨어져 있다.

# 해법

## 무식한 방법

주어진 수열을 배열에 넣은 후에 정렬하고 그 결과를 출력하면 $O(nlogn)$ 시간 복잡도와 $O(n)$ 공간 복잡도다.

## 복잡도 개선

거의 정렬되었다는 이점을 사용하여 복잡도를 개선할 수 있다. k+1개의 숫자 중에서 가장 작은 숫자는 이후의 모든 숫자보다 반드시 작아야 한다.
주어진 예제에서 첫 숫자 세 개 <3,-1,2>에서 가장 작은 숫자인 -1은 전체 숫자에서 가장 작은 숫자여야만 한다.
왜냐하면 입력으로 주어진 모든 숫자가 최종 정렬된 위치에서 최대 2만큼 떨어져 있다는 속성을 가지고 있고 정렬된 수열에서 가장 작은 숫자는 0번 인덱스에 위치해 있기 때문이다.
4를 읽은 후에는 <3,2,4>중에서 가장 작은 숫자인 2가 두번째로 작은 숫자가 된다.

이를 일반화해 보면 k+1개의 숫자를 저장하고, 그 중에서 최솟값을 찾는 작업과 새로운 값을 추가하는 작업을 효율적으로 할 수 있는 자료구조가 필요하다. 따라서 가장 적합한 자료구조는 최소힙이며 첫 번째 k개의 숫자를 최소힙에 추가한다.그 다음 숫자를 최소힙에 추가한 뒤 최소값을 찾는다. (숫자를 모두 소진했다면 최소값 찾는 작업만 수행하면 된다)

$O(nlogk)$ 시간 복잡도, $O(k)$ 공간 복잡도

```cpp
vector<int> SortApproximatelySortedData(
    vector<int>::const_iterator sequence_begin,
    const vector<int>::const_iterator& sequence_end, int k) {
    priority_queue<int, vector<int>, greater<>> min_heap;
    // Adds the first k elements into min_heap. Stop if there are fewer than k
    // elements.
    for (int i = 0; i <= k && sequence_begin != sequence_end; ++i) {
        min_heap.push(*sequence_begin++);
    }

    vector<int> result;
    // For every new element, add it to min_heap and extract the smallest.
    while (sequence_begin != sequence_end) {
        result.push_back(min_heap.top());
        min_heap.pop();
        min_heap.push(*sequence_begin++);
    }

    // sequence is exhausted, iteratively extracts the remaining elements.
    while (!min_heap.empty()) {
        result.push_back(min_heap.top());
        min_heap.pop();
    }

    return result;
}
```
