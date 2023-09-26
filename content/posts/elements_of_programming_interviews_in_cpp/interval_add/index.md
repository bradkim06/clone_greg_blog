---
title: 문제13.7 구간 합치기
subTitle: interval_add
category: algorithm
date: 2023-04-24T13:16:25
cover: ../cover.jpeg
---

# 문제

어떤 사람의 하루 스케줄을 겹치지 않는 시간 구간으로 표현한다고 해 보자. 만약 어떤 이벤트가 이 사람의 일정에 추가된다면, 그날의 전체 스케줄을 갱신해야 한다.

우리가 원하는 것은 겹치지 않게 시간 구간의 집합에 새로운 시간 구간을 추가하는 것이다. 하지만 집합 안에서 시간 구간은 서로 겹치면 안 됨로 이 집합을 새롭게 다시 만들어야 한다. 예를 들어 기존의 집합이 [-4,-1],[0,2],[3,6],[7,9],[11,12],[14,17]이고 [1,8]을 추가한다면 새로운 집합은 [-4,-1],[0,9],[11,12],[14,17]이 된다.

정수 좌표로 이루어진 구간의 집합과 새로 추가될 구간이 입력으로 주어졌을 때, 새로 갱신된 구간의 집합을 반환하는 프로그램을 작성하라. 단, 입력으로 주어지는 구간의 집합은 서로 겹치지 않고, 왼쪽 점의 위치가 증가하는 순서대로 배열에 정렬되어 있다고 가정해도 좋다. 새롭게 갱신한 구간의 집합도 왼쪽 점의 위치가 증가하는 순서대로 정렬되어 있어야 한다.

# 해답

1. 새롭게 추가할 구간보다 확실히 앞에 있는 구간들은 바로 추가한다.
2. 새롭게 추가할 구간과 겹치는 구간은 이 둘을 합친 구간을 새롭게 구한다. 그 뒤 계속해서 구간 집합을 순회하면서 합치는 작업을 계속한다. 더 이상 구간이 겹치지 않는다면 새롭게 합친 구간 하나를 결과 배열에 추가한다.
   - 구간의 Union은 {min_left, max_right}가 된다.
3. 마지막으로 남는 구간도 바로 추가한다.

```cpp
struct Interval {
    int left, right;
};

vector<Interval> AddInterval(const vector<Interval>& disjoint_intervals,
                             Interval new_interval) {
    size_t i = 0;
    vector<Interval> result;

    // Processes intervals in disjoint_intervals which come before new_interval.
    while (i < disjoint_intervals.size() &&
           new_interval.left > disjoint_intervals[i].right) {
        result.emplace_back(disjoint_intervals[i++]);
    }

    // Processes intervals in disjoint_intervals which overlap with
    // new_interval.
    while (i < disjoint_intervals.size() &&
           new_interval.right >= disjoint_intervals[i].left) {
        // If [a, b] and [c, d] overlap, their union is [min(a, c),max(b, d)].
        new_interval = {min(new_interval.left, disjoint_intervals[i].left),
                        max(new_interval.right, disjoint_intervals[i].right)};
        ++i;
    }
    result.emplace_back(new_interval);

    // Processes intervals in disjoint_intervals which come after new_interval.
    result.insert(end(result), begin(disjoint_intervals) + i,
                  end(disjoint_intervals));
    return result;
}
```
