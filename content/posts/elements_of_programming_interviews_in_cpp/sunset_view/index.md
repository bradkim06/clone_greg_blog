---
title: 문제8.5 노을이 보이는 건물 찾기
subTitle: sunset_view
category: algorithm
date: 2023-04-22T13:29:46
cover: ../cover.jpeg
---

서쪽으로 창문이 나 있는 일련의 건물이 입력으로 주어진다. 건물은 서쪽에서 동쪽 방향으로 직선 배치되어 있으므로, 높이가 같거나 낮은 건물이 동쪽에 있다면 그 건물에서는 노을을 볼 수 없다.

동쪽에서 서쪽 방향으로 차례대로 건물을 처리한다고 했을 때 노을을 볼 수 있는 건물의 집합을 반환하는 알고리즘을 설계하라. 모든 건물의 높이는 주어져 있다.

```cpp
vector<int> ExamineBuildingsWithSunset(vector<int>::const_iterator begin,
                                       const vector<int>::const_iterator& end) {
    struct BuildingInfo {
        int idx, height;
    };
    stack<BuildingInfo> BuildingSt;

    int idx = 0;
    for (auto it = begin; it != end; it++) {
        while (!BuildingSt.empty() && *it >= BuildingSt.top().height) {
            BuildingSt.pop();
        }

        BuildingSt.emplace(BuildingInfo{idx++, *it});
    }

    vector<int> result;
    while (!BuildingSt.empty()) {
        result.emplace_back(BuildingSt.top().idx);
        BuildingSt.pop();
    }

    return result;
}
```

## 응용: 건물을 서쪽에서 동쪽 순서대로 처리해 보자. 나머지 조건은 같다

```cpp
vector<int> ExamineBuildingsWithSunset(vector<int>::const_iterator begin,
                                       const vector<int>::const_iterator& end) {
    struct BuildingInfo {
        int idx, height;
    };
    stack<BuildingInfo> BuildingSt;

    int idx = 0;
    BuildingSt.emplace(BuildingInfo{idx++, *begin});
    for (auto it = begin + 1; it != end; it++) {
        if (*it > BuildingSt.top().height) {
            BuildingSt.emplace(BuildingInfo{idx, *it});
        }

        idx++;
    }

    vector<int> result;
    while (!BuildingSt.empty()) {
        result.emplace_back(BuildingSt.top().idx);
        BuildingSt.pop();
    }

    return result;
}
```
