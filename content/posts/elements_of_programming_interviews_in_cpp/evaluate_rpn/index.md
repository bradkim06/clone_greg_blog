---
title: 문제8.2 RPN 수식 계산하기
subTitle: evaluate_rpn
category: algorithm
date: 2023-04-22T11:17:58
cover: ../cover.jpeg
---

다음 조건을 만족하는 문자열은 RPN(Reverse Polish notation)을 따르는 산술 표현식이라 한다.

1. 길이가 1 이상인 숫자로 이루어진 문자열 '-'로 시작하는 경우도 있다. 예를 들어 "6", "123", "-42"가 있다.
2. A와 B가 RPN 수식을 만족하고 O가 +,-,\*,/ 중 하나일 때 "A,B,O"의 형태로 작성된 문자열이다.

RPN 수식을 계산하면 유일한 정수값이 나오는데, 이 값은 재귀적으로 구할 수 있다.
기저 사례(base case)는 1번 규칙, 즉 10진법으로 표기된 정수.
재귀 상태(recursive case)는 2번 규칙과 같고, RPN 수식을 자연스럽게 계산하면 된다.
즉 A가 2이고 B가 3일 때 'A,B,\*'는 6과 같다. 여기서 나누기는 정수를 대상으로 한다.
예를 들어 "7, 2, /"의 결과는 3.5가 아니라 3이다. 나누기 피연산자는 항상 양수라고 가정해도 좋다.

RPN 수식이 주어졌을 때 이 수식의 계산 결과를 반환하는 프로그램을 작성하라.

```cpp
int Evaluate(const string& expression) {
    stringstream ss(expression);
    string token;
    const unordered_map<string, function<int(int a, int b)>> kOperator = {
        {"+", [](int a, int b) { return a + b; }},
        {"-", [](int a, int b) { return a - b; }},
        {"*", [](int a, int b) { return a * b; }},
        {"/", [](int a, int b) { return a / b; }}};

    stack<int> st;
    while (getline(ss, token, ',')) {
        if (!kOperator.count(token)) {
            st.emplace(stoi(token));
            continue;
        }

        const int y = st.top();
        st.pop();
        const int x = st.top();
        st.pop();
        st.emplace(kOperator.at(token)(x, y));
    }

    return st.top();
}
```

## 응용: 같은 문제를 폴란드 표기법(규칙2를 "O,A,B")로 작성하라

```cpp
int Evaluate(const string& expression) {
    stringstream ss(expression);
    string token;
    const unordered_map<string, function<int(int a, int b)>> kOperator = {
        {"+", [](int a, int b) { return a + b; }},
        {"-", [](int a, int b) { return a - b; }},
        {"*", [](int a, int b) { return a * b; }},
        {"/", [](int a, int b) { return a / b; }}};

    stack<string> stOperator;
    stack<int> stNum;
    while (getline(ss, token, ',')) {
        if (kOperator.count(token)) {
            stOperator.emplace(token);
            continue;
        }

        if (stNum.empty()) {
            stNum.emplace(stoi(token));
            continue;
        }

        const string operators = stOperator.top();
        stOperator.pop();
        const int x = stNum.top();
        stNum.pop();
        stNum.emplace(kOperator.at(operators)(x, stoi(token)));
    }

    return stNum.top();
}
```
