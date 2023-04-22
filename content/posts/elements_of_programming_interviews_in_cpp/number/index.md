---
title: 숫자(Numeric) 알고리즘
category: algorithm
date: 2023-04-19T17:42:33
cover: ../cover.jpeg
---

# pow(x,y) 계산하기 $O(N)$

## 무식한 방법 $O(2^n)$

```cpp
double Power2(double x, int y) {
    while (--y) x *= x;
    return x;
}
```

## 나은 방법 $O(n)$

- bit연산을 통해 곱셈 횟수를 줄인다

```cpp
double Power(double x, int y) {
    double result = 1.0;
    long long power = y;
    if (y < 0) power = -power, x = 1.0 / x;

    while (power) {
        if (power & 1) result *= x;
        x *= x, power >>= 1;
    }
    return result;
}
```

# 숫자 뒤집기

- 문자열 변환은 공간복잡도 $O(n)$이 생긴다
- stoll,to_string이 생각보다 더 느리다
  - 숫자 변환 $0.01ms$ $\ll$ 문자열 변환 $573ms$

## 문자열 변환 $O(n^3)$

```cpp

long long ReverseStr(long long x) {
    string s(to_string(x));
    reverse(s.begin(), s.end());
    return stoll(s);
}
```

## Reverse, 문자열 변환이 필요없음 $O(n)$

```cpp
long long Reverse(long long x) {
    long long result = 0;
    while (x) {
        // x가 음수이면, x%10은 최하위 숫자의 음수 값과 같다.
        result = result * 10 + x % 10;
        x /= 10;
    }
    return result;
}
```

# 숫자 회문 확인하기 $O(1)$

- 음수인 경우 무조건 회문이 아니다
- 최상위 자리를 구하기 위해 log를 이용한다
- 문자열 변환은 공간복잡도 $O(n)$이 생긴다

```cpp
bool IsPalindromeNumber(int x) {
    if (x <= 0) return false;

    const int num_digits = static_cast<int>(floor(log10(x))) + 1;
    int msd_mask = static_cast<int>(pow(10, num_digits - 1));
    int len = num_digits / 2;
    for (int i = 0; i < len; i++) {
        if (x / msd_mask != x % 10) return false;

        x %= msd_mask;  // x의 최상위 삭제
        x /= 10;        // x의 최하위 삭제
        msd_mask /= 100;
    }
    return true;
}
```

# 사각형이 겹치는지 확인하기 $O(1)$

- X,Y축이 모두 겹쳐야 한다

```cpp
struct Rect {
    int x, y, width, height;
};

bool IsIntersect(const Rect& r1, const Rect& r2) {
    return r1.x <= r2.x + r2.width && r1.x + r1.width >= r2.x &&
           r1.y <= r2.y + r2.height && r1.y + r1.height >= r2.y;
}

Rect IntersectRectangle(const Rect& r1, const Rect& r2) {
    // 겹치지 않음
    if (!IsIntersect(r1, r2)) return {0, 0, -1, -1};

    return {max(r1.x, r2.x), max(r1.y, r2.y),
            min(r1.x + r1.width, r2.x + r2.width) - max(r1.x, r2.x),
            min(r1.y + r1.height, r2.y + r2.height) - max(r1.y, r2.y)};
}
```
