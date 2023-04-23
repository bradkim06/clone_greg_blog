---
title: 문제12.5 배열에서 반복되는 가장 가까운 원소 찾기
subTitle: nearest_repeated_entries
category: algorithm
date: 2023-04-23T17:30:29
cover: ../cover.jpeg
---

# 문제

배열이 입력으로 주어졌을 때, 반복적으로 나타나는 원소 쌍의 거리 중 가장 가까운 거리를 찾는 프로그램을 작성하라. 예를 들어 s = <"All", "work", "and", "no", "play", "makes", "for", "no", "work", "no", "fund", "and", "no", "results"> 에서는 두 번째와 세 번째에 등장한 "no"의 거리가 가장 가까운 쌍이 된다.

# 해법

단어의 가장 최근 위치를 기반으로 거리를 구한다.

```cpp
int FindNearestRepetition(const vector<string>& paragraph) {
    unordered_map<string, int> m;

    int result =  numeric_limits<int>::max();
    for (int i = 0; i < paragraph.size(); i++) {
        auto it = m.find(paragraph[i]);
        if (it != m.cend()) result = min(result, i - it->second);
        m[paragraph[i]] = i;
    }

    return result == numeric_limits<int>::max() ? -1 : result;
}
```
