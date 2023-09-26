---
title: 문제13.4 성을 제외한 중복되는 이름 제거하기
subTitle: remove_duplicates
category: algorithm
date: 2023-04-24T12:15:25
cover: ../cover.jpeg
---

# 문제

배열에서 성을 제외한 중복된 이름을 삭제하는 효율적인 알고리즘을 설계하라. 예를 들어 입력이 <<Ian, Botham>, <David, Gower>, <Ian, Bell>, <Ian, Chappell>>이라면 결과는 <<Ian, Bell>, <David, Gower>> 이나 <<David, Gower>, <Ian, Botham>>이 될 수 있다.

# 해답

$O(nlogn)$

```cpp
struct Name {
    string first_name, last_name;

    bool operator==(const Name &that) const {
        return first_name == that.first_name;
    }

    bool operator<(const Name &that) const {
        if (first_name != that.first_name) return first_name < that.first_name;
        return last_name < that.last_name;
    }
};

void EliminateDuplicate(vector<Name> *names) {
    // Makes identical elements become neighbors.
    sort(begin(*names), end(*names));
    // unique() removes adjacent duplicates and returns an iterator to the
    // element the follows the last element not removed. The effect of erase()
    // is to restrict names to the distinct elements.
    names->erase(unique(begin(*names), end(*names)), end(*names));
}
```

## 해시 테이블

$O(n)$

```cpp
void EliminateDuplicate(vector<Name> *names) {
    unordered_set<string> _set;

    auto it = names->begin();
    while (it != names->cend()) {
        if (_set.count(it->first_name)) {
            names->erase(it);
        } else {
            _set.emplace(it->first_name);
            it++;
        }
    }
}
```
