---
title: 문제15.7 괄호의 짝이 맞는 문자열 생성하기
subTitle: enumerate_balanced_parentheses
category: algorithm
date: 2023-04-24T23:45:17
cover: ../cover.jpeg
---

# 문제

괄호의 짝이 맞는 문자열이란, 다음 세 가지 규칙에 의해 정의된다.

- 빈 문자열 ""은 괄호의 짝이 맞는 문자열이다.
- 짝이 맞는 문자열의 왼쪽 끝에 왼쪽 괄호를 추가하고 오른쪽 끝에 오른쪽 괄호를 추가한 문자열은 괄호의 짝이 맞는 문자열이다. 예를 들어 "(())()"은 짝이 맞는 문자열이므로 "((())())"도 맞는 문자열이다.
- 짝이 맞는 문자열 두 개를 이어 붙인 문자열도 짝이 맞는 문자열이다. 예를 들어 "(())()"와 "()"는 짝이 맞는 문자열이므로 "(())()()"도 맞는 문자열이다.

예를 들어 두 쌍의 괄호가 짝이 맞는 문자열 집합은 {"(())",ㅡ "()()"}이고, 세 쌍의 괄호가 짝이 맞는 문자열 집합은 {"((()))", "(()())", "(())()", "()(())", "()()()"}이다.

숫자n(괄호의 개수)이 입력으로 주어졌을 때, 해당 숫자쌍의 괄호가 짝이 맞는 모든 문자열을 반환하는 프로그램을 작성하라.

# 해답

완전탐색을 하면 시간 복잡도가 너무 크므로 가지치기를 해야한다.

- 왼쪽 괄호는 n개가 입력될 수 있다.
- 오른쪽 괄호는 현재 왼쪽 괄호의 개수보다 작아야 한다.

```cpp
vector<string> GenerateBalancedParentheses(int num_pairs) {
    vector<string> result;

    function<void(int, int, string)> DirectedGenerateBalancedParentheses =
        [&](int num_left_needed, int num_right_needed, const string &partial) {
            if (!num_right_needed) {
                result.emplace_back(partial);
            }

            if (num_left_needed > 0) {
                DirectedGenerateBalancedParentheses(
                    num_left_needed - 1, num_right_needed, partial + '(');
            }

            if (num_left_needed < num_right_needed) {
                DirectedGenerateBalancedParentheses(
                    num_left_needed, num_right_needed - 1, partial + ')');
            }
        };

    DirectedGenerateBalancedParentheses(num_pairs, num_pairs, "");
    return result;
}
```
