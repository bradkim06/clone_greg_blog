---
title: 문제12.6 모든 값을 포함하는 가장 작은 부분 배열 구하기
subTitle: smallest_subarray_covering_set
category: algorithm
date: 2023-04-23T19:38:32
cover: ../cover.jpeg
---

# 문제

문자열 배열과 검색어 집합이 주어졌을 때, 집합 안의 모든 검색어를 포함하는 가장 짧은 부분 문자열의 시작 인덱스와 끝 인덱스를 반환하는 프로그램을 작성하라. 검색어 집합의 중복값은 없다.

# 해법

```cpp
struct Subarray {
    bool operator<(const Subarray &that) const {
        return (end - start) > (that.end - that.start);
    }
    int start, end;
};

Subarray FindSmallestSubarrayCoveringSet(
    const vector<string> &paragraph, const unordered_set<string> &keywords) {
    unordered_map<string, int> m;
    for (auto s : keywords) m[s]++;

    priority_queue<Subarray> result;
    result.emplace(Subarray{0, static_cast<int>(paragraph.size() - 1)});

    int total = keywords.size();
    // 모든 키워드를 발견할때까지 right를 증가시킨다
    for (int left = 0, right = 0; right < paragraph.size(); right++) {
        if (--m[paragraph[right]] >= 0) total--;

        // 키워드를 발견할 때 까지 left를 증가시킨다
        while (total == 0) {
            if (keywords.count(paragraph[left]) && ++m[paragraph[left]] > 0) {
                // 키워드를 발견했으면 최소 구간 중 하나
                result.emplace(Subarray{left, right});
                total++;
            }
            ++left;
        }
    }

    return result.top();
}
```
