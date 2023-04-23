---
title: 문제12.7 모든 값을 순차적으로 포함하는 가장 작은 부분배열 구하기
subTitle: smallest_subarray_covering_all_values
category: algorithm
date: 2023-04-23T20:44:27
cover: ../cover.jpeg
---

# 문제

문제 12.6은 검색어의 순서를 고려하지 않았다. 검색어가 등장한 순서대로 결과가 나와야 한다면 어떻게 해야 할까? 문자열과 검색어가 주어질 때 **순차적으로 포함**하는 가장 작은 부분배열의 시작위치와 끝 위치를 반환하는 프로그램을 작성하라.

# 해법

## 무식하게 해결하기

첫번째 검색어가 발견될 때마다 계산한다. $O(n^2)$

```cpp
struct Subarray {
    bool operator<(const Subarray &that) const {
        return (end - start) > (that.end - that.start);
    }
    int start, end;
};

Subarray FindSmallestSequentiallyCoveringSubset(
    const vector<string> &paragraph, const vector<string> &keywords) {
    priority_queue<Subarray> result;
    result.emplace(Subarray{0, static_cast<int>(paragraph.size() - 1)});

    int total = keywords.size();
    for (int left = 0, right = 0; right < paragraph.size(); right++) {
        if (keywords[0] == paragraph[right] &&
            keywords.size() <= paragraph.size() - right) {
            left = right;
            int idx = 1;
            for (int i = left + 1; i < paragraph.size(); i++) {
                if (keywords[idx] == paragraph[i]) idx++;

                if (idx == keywords.size()) {
                    result.emplace(Subarray{left, i});
                    break;
                }
            }
        }
    }

    return result.top();
}
```

## 더 나은 방법

각 검색어 인덱스의 마지막 위치와 거리를 저장하여 구한다. $O(n)$

```cpp
struct Subarray {
    // Represent subarray by starting and ending indices, inclusive.
    int start, end;
};

Subarray FindSmallestSequentiallyCoveringSubset(
    const vector<string>& paragraph, const vector<string>& keywords) {
    // Maps each keyword to its index in the keywords array.
    unordered_map<string, int> keyword_to_idx;
    // Initializes keyword_to_idx.
    for (int i = 0; i < keywords.size(); ++i) {
        keyword_to_idx.emplace(keywords[i], i);
    }

    // Since keywords are uniquely identified by their indices in keywords
    // array, we can use those indices as keys to lookup in a vector.
    vector<int> latest_occurrence(keywords.size(), -1);
    // For each keyword (identified by its index in keywords array), storesult
    // the length of the shortest subarray ending at the most recent occurrence
    // of that keyword that sequentially cover all keywords up to that keyword.
    vector<int> shortest_subarray_length(keywords.size(),
                                         numeric_limits<int>::max());

    int shortest_distance = numeric_limits<int>::max();
    Subarray result = Subarray{-1, -1};
    for (int i = 0; i < paragraph.size(); ++i) {
        if (keyword_to_idx.count(paragraph[i])) {
            int keyword_idx = keyword_to_idx.find(paragraph[i])->second;
            if (keyword_idx == 0) {  // First keyword.
                shortest_subarray_length[keyword_idx] = 0;
            } else if (shortest_subarray_length[keyword_idx - 1] !=
                       numeric_limits<int>::max()) {
                // 처음 이후엔 순서대로 나오지 않으면 거리가 최소값이 아님
                int distance_to_previous_keyword =
                    i - latest_occurrence[keyword_idx - 1];
                shortest_subarray_length[keyword_idx] =
                    distance_to_previous_keyword +
                    shortest_subarray_length[keyword_idx - 1];
            }
            latest_occurrence[keyword_idx] = i;

            // Last keyword, look for improved subarray.
            if (keyword_idx == keywords.size() - 1 &&
                shortest_subarray_length.back() < shortest_distance) {
                shortest_distance = shortest_subarray_length.back();
                result = {i - shortest_subarray_length.back(), i};
            }
        }
    }
    return result;
}
```
