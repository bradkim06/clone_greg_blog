---
title: 문제10.5 실시간으로 주어진 데이터의 중앙값 찾기
subTitle: online_median
category: algorithm
date: 2023-04-22T22:33:32
cover: ../cover.jpeg
---

# 문제

어떤 시퀀스가 스트리밍으로 들어오는데 실시간으로 중앙값을 계산하려고 한다. 스트리밍이므로 이전 값을 어딘가에 저장해 놓고 읽을 수 없다. 따라서 새로운 원소를 읽을 때마다 중앙값을 출력해야 한다. 예를 들어 입력이 1,0,3,5,2,0,1 이라면 출력은 1,0,5,1,2,2,1,5,1이 된다.

어떤 시퀀스의 중앙값을 실시간으로 찾아주는 알고리즘을 설계해 보라.

# 해법

- $minHeap == maxHeap$이면 $minHeap.top()$이 median.
- $minHeap != maxHeap$이면 $\text{\(\frac {minHeap.top() + maxHeap.top()} 2\)}$가 median.

```cpp
vector<double> OnlineMedian(vector<int>::const_iterator sequence_begin,
                            const vector<int>::const_iterator& sequence_end) {
    // min_heap stores the larger half seen so far.
    priority_queue<int, vector<int>, greater<>> min_heap;
    // max_heap stores the smaller half seen so far.
    priority_queue<int> max_heap;
    vector<double> result{static_cast<double>(*sequence_begin)};
    min_heap.emplace(*sequence_begin++);

    while (sequence_begin != sequence_end) {
        min_heap.emplace(*sequence_begin++);
        max_heap.emplace(min_heap.top());
        min_heap.pop();

        if (max_heap.size() > min_heap.size()) {
            min_heap.emplace(max_heap.top());
            max_heap.pop();
        }

        result.emplace_back(min_heap.size() == max_heap.size()
                                ? 0.5 * (min_heap.top() + max_heap.top())
                                : min_heap.top());
    }

    return result;
}
```
