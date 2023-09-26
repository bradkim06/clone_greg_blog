---
title: 외벽 점검
subTitle: level3, 2020 KAKAO BLIND RECRUITMENT
category: programmers
date: 2023-04-25T14:48:48
cover: ../../cover.jpeg
---

# 문제

[외벽 점검 링크](https://school.programmers.co.kr/learn/courses/30/lessons/60062)

# 해답

입력 조건의 수가 작으므로 그냥 완전 탐색으로 해결, weak, dist의 모든 경우의 수를 검사.
TODO. 가지치기가 가능하지 않을까...?

```cpp
#include <bits/stdc++.h>

using namespace std;

int solution(int n, vector<int> weak, vector<int> dist) {
    sort(dist.begin(), dist.end());
    int answer = INT_MAX;

    vector<vector<int>> weakCase;
    for(int i=0; i<weak.size(); i++){
        rotate(weak.begin(), weak.begin()+1, weak.end());
        weakCase.push_back(weak);
    }

    do{
        for(auto e : weakCase){
            vector<int> w(e), d(dist);
            int cnt=0;

            int worker = d.back();
            d.pop_back();
            cnt++;

            for(auto it=w.rbegin(); it!=w.rend()-1; it++){
                int distance = *it - *next(it);
                if(distance < 0) distance += n;

                worker -= distance;
                if(worker < 0) {
                    if(d.empty()) {
                        cnt = INT_MAX;
                        break;
                    }
                    worker = d.back();
                    d.pop_back();
                    cnt++;
                }
            }

            answer = min(answer, cnt);
        }
    } while(next_permutation(dist.begin(), dist.end()));

    return answer == INT_MAX ? -1 : answer;
}
```
