---
title: 문제11.4 정수의 제곱근 구하기
subTitle: int_square_root
category: algorithm
date: 2023-04-23T16:07:16
cover: ../cover.jpeg
---

# 문제

음이 아닌 정수가 주어졌을 때, 제곱한 값이 주어진 정수보다 작거나 같은 정수 중에서 가장 큰 정수를 찾는 프로그램을 작성하라. 예를 들어 16이 입력으로 주어지면 4를 반환해야 하고, 300이 입력으로 주어지면 17을 반환해야 한다.

# 해답

문제를 잘못 이해한건지, 문제가 적절하지 않은 건지. 제곱된 값을 전달 받는데 왜 굳이 이진 탐색을 하는지 이해를 못하겠다. 문제의 입력 케이스가 적절하지 않다고 생각된다.

```cpp
int SquareRoot(int k) { return static_cast<int>(sqrt(k)); }
```

```markdown
Test PASSED (2000/2000)
Average running time: <1 us
Median running time: <1 us
**_ You've passed ALL tests. Congratulations! _**

[Process exited 0]
```

## solution code

```cpp
int SquareRoot(int k) {
    int left = 0, right = k;
    // Candidate interval [left, right] where everything before left has
    // square <= k, and everything after right has square > k.
    while (left <= right) {
        long long mid = left + ((right - left) / 2);
        if (long long mid_squared = mid * mid; mid_squared <= k) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left - 1;
}
```
