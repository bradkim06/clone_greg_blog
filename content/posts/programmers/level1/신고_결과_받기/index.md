---
title: 신고 결과 받기
subTitle: level1, 2022 KAKAO BLIND RECRUITMENT
category: programmers
date: 2023-04-25T14:27:09
cover: ../../cover.jpeg
---

# 문제

[신고 결과 받기 링크](https://school.programmers.co.kr/learn/courses/30/lessons/92334)

# 해답

- 신고 받은 횟수와 신고한 리스트를 저장, $O(1)$탐색을 위해 hash map 사용
- hash set으로 중복 검사
  - unique를 사용해 report 중복 제거를 할 수 있지만 시간 복잡도도 상승, 원본 데이터 손실 발생

복잡도 $O(n+m)$ n:id_list size, m:report size

```cpp
#include <bits/stdc++.h>

using namespace std;

vector<int> solution(vector<string> id_list, vector<string> report, int k) {
    vector<int> answer(id_list.size());
    unordered_map<string, unordered_set<string>> report_list;
    unordered_map<string, int> report_count;

    for (const string& s : report) {
        stringstream ss(s);
        string userId, reportId;
        ss >> userId >> reportId;

        if (report_list.count(userId)) {
            if (report_list.at(userId).find(reportId) !=
                report_list.at(userId).cend())
                continue;
        }

        report_count[reportId]++;
        report_list[userId].insert(reportId);
    }

    for (int i = 0; i < id_list.size(); i++) {
        string id = id_list[i];
        if (report_list.count(id)) {
            for (const string& id : report_list.at(id)) {
                if (report_count[id] >= k) {
                    answer[i]++;
                }
            }
        }
    }

    return answer;
}
```
