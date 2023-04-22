---
title: 문제10.0 k번째로 긴 문자열 찾기
subTitle: heap_bootcamp
category: algorithm
date: 2023-04-22T17:35:30
cover: ../cover.jpeg
---

문자열이 '스트리밍'방식으로 들어온다고 가정하자. 앞에서 입력된 문자열은 뒤로 돌아가서 읽을 수가 없다는 뜻이다. 이때 길이가 k번째로 긴 문자열을 찾는 프로그램을 작성해 보자.

입력을 처리함과 동시에 현재까지 문자열 중에서 k번째로 긴 문자열이 무엇인지 추적하려고 한다. 현재 k개의 문자열이 있다고 가정해 보자. 길이가 더 긴 문자열이 입력으로 들어온다면 길이가 가장 작은 문자열을 지워야 한다.
최소힙 자료구조를 사용하면 최소값 찾는 연산, 최소값 삭제하는 연산, 삽입 연산을 효율적으로 할 수 있기 때문에 이 문제를 푸는 데 적합하다.

```cpp
#include <bits/stdc++.h>

using namespace std;

template <class T>
std::ostream& operator<<(std::ostream& stream, const std::vector<T>& values) {
    copy(begin(values), end(values), std::ostream_iterator<T>(stream, " "));
    return stream;
}

string TopK(int k, vector<string>::const_iterator stream_begin,
            const vector<string>::const_iterator& stream_end) {
    priority_queue<string, vector<string>, function<bool(string, string)>>
        min_heap([](const string& a, const string& b) {
            return a.size() >= b.size();
        });

    while (stream_begin != stream_end) {
        min_heap.emplace(*stream_begin);
        if (min_heap.size() > k) {
            // 길이가 가장 작은 문자열 삭제
            min_heap.pop();
        }
        stream_begin = next(stream_begin);
    }
    return min_heap.top();
}

int main() {
    vector<string> testcase{
        {"test1", "testtest2", "testtesttest3", "testtesttesttest4"}};
    cout << TopK(2, testcase.begin(), testcase.end());
    return 0;
}
```
