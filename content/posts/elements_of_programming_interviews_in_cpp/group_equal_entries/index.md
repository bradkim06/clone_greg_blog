---
title: 문제13.9 반복되는 원소가 많은 배열, 정렬하고 나누기
subTitle: group_equal_entries
category: algorithm
date: 2023-04-24T16:35:40
cover: ../cover.jpeg
---

# 문제

학생 객체로 이루어진 배열이 주어진다. 각 학생의 나이와 이름이 주어지고 나이가 학생의 키값이 된다. 나이가 같은 학생들을 함께 두도록 배열을 재정렬 하라. 나이가 다른 학생의 순서는 중요하지 않다.

# 해답

## 무식한 방법

나이를 기준으로 정렬하는 것은 문제의 요구조건보다 더 많은 처리를 수행하기 때문에 비 효율적이다.

$O(nlogn)$

```cpp
struct Person {
    int age;
    string name;

    bool operator<(const Person& that) const { return age < that.age; }
};

void GroupByAge(vector<Person>* people) {
    sort(people->begin(), people->end());
}
```

## 개선된 방식

순서는 상관없이 나이가 같은 요소들만 묶어주면 된다. $O(n)$

1. 같은 나이의 총 인원, 저장할 시작 인덱스를 hash에 기록
2. 각각 나이의 원소를 시작 인덱스부터 ++시키며 swap()

$O(n)$

```cpp
struct Person {
    int age;
    string name;
};

void GroupByAge(vector<Person>* people) {
    unordered_map<int, int> age_to_count;
    for (const Person& p : *people) {
        ++age_to_count[p.age];
    }
    unordered_map<int, int> age_to_offset;
    int offset = 0;
    for (const auto& [age, count] : age_to_count) {
        age_to_offset[age] = offset;
        offset += count;
    }

    while (!empty(age_to_offset)) {
        auto from = begin(age_to_offset);
        auto to = age_to_offset.find((*people)[from->second].age);
        swap((*people)[from->second], (*people)[to->second]);
        // Use age_to_count to see when we are finished with a particular age.
        --age_to_count[to->first];
        if (age_to_count[to->first] > 0) {
            ++to->second;
        } else {
            age_to_offset.erase(to);
        }
    }
}
```
