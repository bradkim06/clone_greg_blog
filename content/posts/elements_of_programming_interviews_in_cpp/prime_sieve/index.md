---
title: n보다 작은 모든 소수 나열하기
subTitle: prime_sieve
category: algorithm
date: 2023-04-21T12:29:23
cover: ../cover.jpeg
---

보통 에라토스테네스의 체만 써도 효율성 테스트를 통과하는데 더 나아가 짝수 연산을 줄인 최적화 코드

```cpp
vector<int> GeneratePrimes(int n) {
    if (n < 2) {
        return {};
    }
    const int size = floor(0.5 * (n - 3)) + 1;
    vector<int> primes;
    primes.emplace_back(2);
    // is_prime[i] represents whether (2i + 3) is prime or not.
    // For example, is_prime[0] represents 3 is prime or not, is_prime[1]
    // represents 5, is_prime[2] represents 7, etc.
    // Initially, set each to true. Then use sieving to eliminate nonprimes.
    deque<bool> is_prime(size, true);
    for (int i = 0; i < size; ++i) {
        if (is_prime[i]) {
            int p = (i * 2) + 3;
            primes.emplace_back(p);
            // Sieving from p^2, whose value is (4i^2 + 12i + 9). The index in
            // is_prime is (2i^2 + 6i + 3) because is_prime[i] represents 2i
            // + 3.
            //
            // Note that we need to use long long for j because p^2 might
            // overflow.
            for (long long j = 2LL * i * i + 6 * i + 3; j < size; j += p) {
                is_prime[j] = false;
            }
        }
    }
    return primes;
}
```
