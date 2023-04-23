---
title: Elements of Programming Interviews in C++
category: algorithm
date: 2023-04-19T11:33:58
cover: ../cover.jpeg
---

아직 초반부를 읽는데 좋은 책이라는 느낌이 확실히 전해져 온다.
책이 두꺼우며 생각할 거리를 많이 던져주기 때문에 시간이 날때마다 천천히 정독을 해야될 것 같다.
복기를 위해 읽은 내용을 블로그에 정리해 두려 한다.
이 게시물의 내용들은 코드레벨이 아닌 사항들만 정리한다. 문제들의 Solution, TestCase는 Github에 공유되고 있다.

https://github.com/adnanaziz/EPIJudge

** 파일들을 다음과 같은 형식으로 되어 있으며 Solution 작성하고 테스트 결과가 출력된다 효율성 테스트는 없는것으로 보인다 **

```cpp title=parity.cpp
#include "test_framework/generic_test.h"
short Parity(unsigned long long x) {
  // TODO - you fill in here.
  short result = 0;
  while (x) {
    result ^= 1;
    x &= (x - 1); // x의 하위비트 제거
  }
  return result;
  return 0;
}

int main(int argc, char *argv[]) {
  std::vector<std::string> args{argv + 1, argv + argc};
  std::vector<std::string> param_names{"x"};
  return GenericTestMain(args, "parity.cc", "parity.tsv", &Parity,
                         DefaultComparator{}, param_names);
}
```

```markdown title=result
Test PASSED (10000/10000) [ 4 us] Average running time: <1 us Median running
time: <1 us **_ You've passed ALL tests. Congratulations! _**
```

# Chapter 1

## EPI(Elements of Programming Interviews) Style

### EPI Style 문제

1. 실전 예제를 통해 문맥(context)를 보여 준다
2. 해결해야 할 문제를 제공
3. 간단한 힌트 제공

### EPI Style 해법

1. 먼저 무식한 방법의 풀이를 설명한다
2. 무식한 알고리즘이 왜 비효율적인지 분석하고 개선할 수 있는 직관을 얻기 위해 살펴본다
3. 더 효율적인 알고리즘을 개발하고, 그에 대해 설명한다
4. 실제 입력 데이터를 알고리즘에 대입해 본다
5. 알고리즘에서 중요한 부분을 코드로 보여준다
6. 시간 및 공간 복잡도를 분석한다
7. 약간 변형된 문제들을 제공한다

## 저자의 추천 서적

- "C++ Primer" by Stanley Lippman
- "Effective C++" by Scott Meyers
- "Algorithms" by Sanjoy Dasgupta
- "Introduction to Algorithms" by Thomas H. Cormen

## C++ 모범 사례

- 함수에 대한 입력 인수는 값 또는 const 참조다. swap() 같이 관례상 요구되는 경우를 제외하면 비 const 참조(non-const referencees)는 허용하지 않는다
- 포인터를 사용하여 출력 인수를 함수에 전달한다. 이렇게 하면 호출된 함수에 의해 인수가 업데이트 되었는지 확인하기 위해 함수 소스코드를 볼 필요가 없다
- bool 배열을 사용할 때는 **deque<bool\>**을 사용한다. **vector<int\>**는 STL 컨테이너가 아니며 실제로 부울을 보유하지 않는다. 예를 들어, **bool \*pb = &A[0];**에서 A가 **vector<bool\>** 타입이면 컴파일되지 않는다.

### C++11 구문

- auto 속성은 초기화 표현식에 기반하여 변수의 타입을 할당한다
- 향상된 범위 기반 for-loop를 사용하면 원소들을 쉽게 반복할 수 있다
- emplace_front와 emplace_back 함수는 새로운 원소를 컨테이너의 시작과 끝에 추가한다. 이 함수들을 push_front나 push_back과 비교하면 계산적으로 더 효율적이다. 또한 가변 숫자 인수를 활용해 가변적인다. emplace 함수는 삽입 방법이 하나뿐인 스택이나 맵과 유사하게 적용할 수 있다.
- tuple 타입은 정렬된 집합을 구현한다

## 면접에 최적화된 코드

- 접근자(getter)와 설정자(setter)는 사용하지 않는다. 모든 변수를 public으로 만든다
- 입력값의 유효성을 검증하지 않는다.
  - null pointer or reference check
  - type check
- 때때로 정적 필드를 사용해서 값을 전달한다. 스레드 안정성은 감소하지만 만들어야 할 클래스 수를 줄일 수 있다.
- Generic 프로그래밍은 쓰지 않는다.

# Chapter 4. 기본 자료형

## 기본 자료형 문제를 풀기 전 꼭 알고 있어야 할 내용

- 비트 연산, 특히 XOR을 잘 다뤄야 한다
- 1로 세팅된 하위 비트의 값을 최적의 방법으로 지울 수 있어야 한다
- 부호 여부에 따른 시프트 연산에 대해 이해하고 있어야 한다
- 입력이 작은 경우 연산 결과를 캐시에 저장해 빠르게 할 수 있어야 한다
- 교환법칙과 결합법칙을 이용해 병렬 연산, 연산 순서를 바꿀 수 있어야 한다

## 기본 자료형 이해하기

- numeric_limits<int\>::min(), numeric_limits<float\>::max(), numeric_limits<double\>::infinity()처럼 숫자 타입의 최대값과 최솟값에 대한 표현을 알아야 한다
- 부동 소수점 비교는 주의해야 한다 11.5(실수의 제곱근 구하기) 참고
- random 라이브러리는 테스트 코드를 작성할 때 유용하다. uniform_int_distribution<\> dis(1, 6)(1에서 6사이의 정수 값을 반환), uniform_real_distribution<double\> dis(1.3, 2.9)(1.3에서 2.9사이의 부동소수점 값을 반환), generate_canonical<double, 10\>(0부터 1미만 사이의 부동소수점 값을 반환)이 있다

# Chapter 5. 배열

- 배열의 읽기는 $O(1)$ 삭제, 삽입은 상황에 따라 $O(n-i)$이 된다
- 원소를 삭제해서 다른 원소들을 옮기기 보다는 삭제할 원소에 덮어쓰는 방법이 나을 수도 있다

# Chapter 6. 문자열

- 문자열은 배열처럼 구성되어 있다는 걸 기억하라. insert(A.begin() + middle, "Gauss")와 같이 문자열 중간에서 발생하는 작업은 효율이 떨어진다

# Chapter 12. 해시 테이블

- 해시 테이블은 문자열 집합을 표현하기 좋은 자료구조
- trie 트리 자료구조는 동적으로 변하는 문자열 집합을 저장할 때 유용하다

## 롤링 해시

문자열 맨 앞의 문자를 삭제하고 맨 뒤에 문자를 추가하는 방식은 새로운 해시 코드를 $O(1)$ 시간 내에 계산할 수 있다.

```cpp
int StringHash(const string& s, int modulus) {
    const int kMult = 997;
    return accumulate(s.begin(), s.end(), 0, [kMult, modulus](int val, char c) {
        return (val * kMult * c) % modulus;
    });
}
```
