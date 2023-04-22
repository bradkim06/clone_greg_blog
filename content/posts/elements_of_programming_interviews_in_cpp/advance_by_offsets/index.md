---
title: 배열에서 이동하기
subTitle: advance_by_offsets
category: algorithm
date: 2023-04-20T16:49:14
cover: ../cover.jpeg
---

배열 A = <3,3,1,0,2,0,1\>에서 i번째 위치에서는 최대 A[i]만큼 앞으로 나갈수 있다.
길이가 n인 배열 A가 주어졌을 때, 배열의 시작점에서 마지막 지점까지 도달할 수 있는지 판단하는 프로그램을 작성하라.

## 최대한 움직일 수 있는 거리 기록(DP)

```cpp
bool CanReachEnd(const vector<int>& max_advance_steps) {
    int curr = 0, last_index = max_advance_steps.size() - 1;
    for (int i = 0; i <= curr && curr < last_index; ++i) {
        curr = max(curr, max_advance_steps[i] + i);
    }
    return curr >= last_index;
}
```

## 응용: 마지막 위치에 도달할 수 있는 최소한의 움직임을 계산하는 프로그램을 작성하라

step이 큰것만 탐색

```cpp
int CanReachEnd(const vector<int>& steps) {
    int depth = 1, curr = steps[0], currIdx = 0, last_index = steps.size() - 1;

    while (curr < last_index) {
        int maxNextIdx = 0;
        for (int i = steps[currIdx] + currIdx; i > currIdx; --i) {
            if (curr < (steps[i] + i)) {
                curr = steps[i] + i;
                maxNextIdx = i;
            }
        }

        if (currIdx >= maxNextIdx) return -1;
        currIdx = maxNextIdx;
        depth++;
    }

    return depth;
}
```

```markdown
Test PASSED (2004/2004) [ 68 us]
Average running time: <1 us
Median running time: <1 us
**_ You've passed ALL tests. Congratulations! _**
```
