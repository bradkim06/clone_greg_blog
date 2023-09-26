---
title: 문제12.10 모든 문자열 분해하기
subTitle: string_decompositions_into_dictionary_words
category: algorithm
date: 2023-04-23T23:27:04
cover: ../cover.jpeg
---

# 문제

문장과 단어 집합이 주어졌을 때 모든 단어를 이어 붙인 부분 문자열을 문장에서 찾아라. 예를 들어 문장이 "amanaplanacanal"이고 단어 집합이 <"can", "apl", "ana">라면 "aplanacan"이 모든 단어를 이어 붙인 부분 문자열이 된다.

문장과 단어집합이 입력으로 주어졌을 때, 단어를 모두 이어 붙인 문자열이 문장의 어느 부분과 같은지 그 시작 위치를 반환하는 프로그램을 작성하라. 모든 단어는 한번씩 등장해야 하며 이어 붙인 순서는 중요하지 않다. 모든 단어의 길이는 같다고 가정해도 좋다. 단어 배열에는 중복된 단어가 존재할 수도 있다.

# 해답

단어의 길이는 모두 같으므로 단어의 길이만큼 index를 증가시키며 탐색하고 hashMap의 모든 경우가 다 검색되는지 확인한다.

```cpp
vector<int> FindAllSubstrings(const string& s, const vector<string>& words) {
    unordered_map<string, int> word_freq;
    for (const string& word : words) {
        ++word_freq[word];
    }

    int total = words.size(), wordLen = words.back().size();
    vector<int> result;

    function<void(int start)> MatchAllWordsInDict = [&](int start) -> void {
        unordered_map<string, int> curr_freq;

        for (int i = 0; i < total; i++) {
            auto it = word_freq.find(s.substr(start + i * wordLen, wordLen));
            if (it == word_freq.cend()) return;
            if (++curr_freq[it->first] > it->second) return;
        }

        result.emplace_back(start);
    };

    for (int i = 0; i + wordLen * words.size() <= s.size(); i++) {
        MatchAllWordsInDict(i);
    }

    return result;
}
```
