---
title: 문제12.8 서로 다른 엔트리를 포함하는 가장 긴 부분배열 구하기
subTitle: longest_subarray_with_distinct_values
category: algorithm
date: 2023-04-23T21:46:06
cover: ../cover.jpeg
---

# 문제

배열이 주어졌을 때, 중복된 원소가 없는 가장 긴 부분배열의 길이를 반환하는 프로그램을 작성하라. 예를 들어 <f,s,f,e,t,w,e,n,w,e>가 주어졌을 때 중복되지 않은 가장 긴 부분배열은 <s,f,e,t,w>가 된다.

# 해답

단순하게 해시 테이블을 사용해서 모든 부분배열에 중복 검사를 하게되면 $O(n^3)$으로 비효율적이다. 중복된 원소를 발견하면 최대 거리와 시작인덱스를 갱신하면 된다. $O(n)$

```cpp
int LongestSubarrayWithDistinctEntries(const vector<int>& A) {
    // Records the most recent occurrences of each entry.
    unordered_map<int, size_t> most_recent_occurrence;
    size_t longest_dup_free_subarray_start_idx = 0, result = 0;
    for (size_t i = 0; i < A.size(); ++i) {
        const auto& [inserted_entry, inserted_happen] =
            most_recent_occurrence.emplace(A[i], i);
        // Defer updating dup_idx until we see a duplicate.
        if (!inserted_happen) {
            // A[i] appeared before. Did it appear in the longest current
            // subarray?
            if (inserted_entry->second >= longest_dup_free_subarray_start_idx) {
                result = max(result, i - longest_dup_free_subarray_start_idx);
                longest_dup_free_subarray_start_idx =
                    inserted_entry->second + 1;
            }
            inserted_entry->second = i;
        }
    }
    return max(result, A.size() - longest_dup_free_subarray_start_idx);
}
```
