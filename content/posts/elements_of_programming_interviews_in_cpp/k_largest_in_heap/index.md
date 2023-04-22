---
title: 문제10.6 최대힙에서 가장 큰 원소 k개 구하기
subTitle: k_largest_in_heap
category: algorithm
date: 2023-04-22T23:00:27
cover: ../cover.jpeg
---

# 문제

힙은 원소의 순서에 관해서 제한된 정보를 담고 있다. 그래서 가장 큰 원소 k개를 구하는 고지식한 알고리즘의 시간 복잡도는 정렬된 배열이나 균형 잡힌 이진 탐색트리와 다르게 원소 개수에 따라 선형적으로 증가한다.

배열 A에 최대힙이 주어졌을 때, 여기서 가장 큰 k개의 원소를 구하는 알고리즘을 설계하라. 힙의 자료구조를 수정하면 안 된다. 예를 들어 주어진 힙이 Figure 1과 같다고 해 보자. 이를 배열로 표현하면 <561, 314, 401, 28, 156, 359, 271, 11, 3>이 되고, 가장 큰 원소 네 개는 561, 314, 401, 359가 된다.

#### Figure 1

import { Mermaid } from 'mdx-mermaid/Mermaid';

<Mermaid chart={`graph TB; A(561)-->B(314); A-->C(401); B-->D(28); B-->E(156); D-->H(11); D-->I(3); C-->F(359); C-->G(271); `} />

# 해법

부모 노드는 언제나 자식 노드보다 크거나 같으므로 A[0]가 가장 크고 다음으로 A[1], A[2]가 된다. 따라서 큰 원소들만 찾아서 최대힙에 넣어준다. $O(k)$

> 문제 11.8의 해법을 통해 $O(n)$으로 해결할 수 있으나 힙을 수정해야 한다.

```cpp
vector<int> KLargestInBinaryHeap(const vector<int>& A, int k) {
    if (k <= 0) {
        return {};
    }

    struct HeapEntry {
        bool operator<(const HeapEntry& that) const {
            return value < that.value;
        }
        int index, value;
    };
    priority_queue<HeapEntry> max_heap;
    // The largest element in A is at index 0.
    max_heap.push({0, A[0]});
    vector<int> result;
    for (int i = 0; i < k; ++i) {
        int candidate_idx = max_heap.top().index;
        result.emplace_back(max_heap.top().value);
        max_heap.pop();

        if (int left_child_idx = 2 * candidate_idx + 1;
            left_child_idx < A.size()) {
            max_heap.push({left_child_idx, A[left_child_idx]});
        }
        if (int right_child_idx = 2 * candidate_idx + 2;
            right_child_idx < A.size()) {
            max_heap.push({right_child_idx, A[right_child_idx]});
        }
    }
    return result;
}
```
