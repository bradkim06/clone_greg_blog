---
title: parity 계산하기
subTitle: from. Elements of Programming Interviews in C++
category: algorithm
date: 2023-04-19T12:33:58
cover:
---

2진수의 Parity를 구하는 알고리즘 비교.

#### 무식하게 풀기 `O(N)`

```cpp
short Pairty(int x){
    short result = 0;
    while (x) {
        result ^= (x & 1);
        x >>= 1;
    }
    return result;
}
```

#### 1로 세팅된 비트의 개수가 k개면 `O(k)`

```cpp
short Parity(int x) {
    short result = 0;
    while (x) {
        result ^= 1;
        x &= (x - 1); // x의 하위비트 제거
    }
    return result;
}
```

#### LookUp Table을 이용한 방법 `O(N/L)`

N = 전체 비트수(32), L = 해시 테이블의 키값의 크기(8)

```cpp
// Macros to generate the lookup table (at compile-time)
static const bool ParityTable256[256] = {
#define P2(n) n, n ^ 1, n ^ 1, n
#define P4(n) P2(n), P2(n ^ 1), P2(n ^ 1), P2(n)
#define P6(n) P4(n), P4(n ^ 1), P4(n ^ 1), P4(n)
    P6(0), P6(1), P6(1), P6(0)};

// Function to find parity of `x`
short findParity(int x) {
    const short kMaskSize = 8;
    const short kBitMask = 0xFF;

    return ParityTable256[x >> (3 * kMaskSize)] ^
           ParityTable256[(x >> (2 * kMaskSize)) & kBitMask] ^
           ParityTable256[(x >> kMaskSize) & kBitMask] ^
           ParityTable256[x & kBitMask];
}
```

#### 결합법칙, 교환법칙 응용 `O(logn)`

```cpp
// Compute parity of a number `x` using the lookup table
short findParity(int x) {
    // recursively divide the (32–bit) integer into two equal
    // halves and take their XOR until only 1 bit is left
    x ^= x >> 16;
    x ^= x >> 8;
    x ^= x >> 4;
    x ^= x >> 2;
    x ^= x >> 1;

    // return 1 if the last bit is set; otherwise, return 0
    return x & 1;
}
```

#### Maybe... Best Practice

```cpp
static const bool ParityTable256[256] = {
#define P2(n) n, n ^ 1, n ^ 1, n
#define P4(n) P2(n), P2(n ^ 1), P2(n ^ 1), P2(n)
#define P6(n) P4(n), P4(n ^ 1), P4(n ^ 1), P4(n)
    P6(0), P6(1), P6(1), P6(0)};

int main() {
    // byte value to compute the parity of
    unsigned char b;
    bool parity = ParityTable256[b];

    // OR, for 32-bit words:
    unsigned int v;
    v ^= v >> 16;
    v ^= v >> 8;
    parity = ParityTable256[v & 0xff];

    // Variation:
    unsigned char* p = (unsigned char*)&v;
    parity = ParityTable256[p[0] ^ p[1] ^ p[2] ^ p[3]];
    return 0;
}
```

### Reference

https://graphics.stanford.edu/~seander/bithacks.html
