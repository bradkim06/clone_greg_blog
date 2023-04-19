---
title: 비트 조작(bit manipulation) 알고리즘
subTitle: from. Elements of Programming Interviews in C++
category: algorithm
date: 2023-04-19T12:33:58
cover:
---

책 내용이 좋아 기록해 둔다.

# 비트 조작

#### 최하위 비트 조작

```cpp
int result = 0;
// 최하위 비트 제거
result = x & (x - 1);
// 최하위 비트 뽑기
result = x & ~(x - 1);
```

#### i번째 비트와 j번째 비트를 Swap

```cpp
long long SwapBits(long long x, int i, int j) {
    // i,j 비트가 같다면 swap이 필요없음
    if (((x >> i) & 1) == ((x >> j) & 1)) return x;

    // 다르다면 i,j 비트를 XOR로 뒤집으면 스왑된다
    unsigned long long bit_mask = (1L << i) || (1L << j);
    return x & bit_mask;
}
```

### 비트 뒤집기

#### 무식하게 해결하기 `O(N)`

```cpp
template<std::size_t N>
void reverse(std::bitset<N> &b) {
    for(std::size_t i = 0; i < N/2; ++i) {
        bool t = b[i];
        b[i] = b[N-i-1];
        b[N-i-1] = t;
    }
}
```

#### 무식하게 해결하기2 `O(N)`

```cpp
#include <algorithm>
#include <bitset>
#include <iostream>
#include <string>

int main() {
  auto x = std::bitset<32>(10);
  std::cout << x << std::endl;

  auto str = x.to_string();
  std::reverse(str.begin(), str.end());
  auto y = std::bitset<32>(str);
  std::cout << y << std::endl;

  return 0;
}

// result
// 00000000000000000000000000001010
// 01010000000000000000000000000000
```

#### LUT 사용 `O(N/L)`

N = 전체 비트수(32), L = 해시 테이블의 키값의 크기(8)

```cpp
static const unsigned char BitReverseTable256[256] = {
#define R2(n) n, n + 2 * 64, n + 1 * 64, n + 3 * 64
#define R4(n) R2(n), R2(n + 2 * 16), R2(n + 1 * 16), R2(n + 3 * 16)
#define R6(n) R4(n), R4(n + 2 * 4), R4(n + 1 * 4), R4(n + 3 * 4)
    R6(0), R6(2), R6(1), R6(3)};

unsigned int v;  // reverse 32-bit value, 8 bits at time
unsigned int c;  // c will get v reversed

// Option 1:
c = (BitReverseTable256[v & 0xff] << 24) |
    (BitReverseTable256[(v >> 8) & 0xff] << 16) |
    (BitReverseTable256[(v >> 16) & 0xff] << 8) |
    (BitReverseTable256[(v >> 24) & 0xff]);

// Option 2:
unsigned char *p = (unsigned char *)&v;
unsigned char *q = (unsigned char *)&c;
q[3] = BitReverseTable256[p[0]];
q[2] = BitReverseTable256[p[1]];
q[1] = BitReverseTable256[p[2]];
q[0] = BitReverseTable256[p[3]];
```

# Parity 계산하기

Parity를 구하는 알고리즘 비교.

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

#### STL Bitset `O(N)`

```cpp
long long value = 23423423;
cout << (bitset<64>(value).count() & 1) << endl;
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
