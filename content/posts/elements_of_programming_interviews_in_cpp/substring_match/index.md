---
title: 문제6.12 부분 문자열이 첫 번째로 등장한 위치 찾기
subTitle: substring_match
category: algorithm
date: 2023-04-21T22:01:39
cover: ../cover.jpeg
---

검색할 문자열 s("search string")과 텍스트 t("text")가 주어졌을 때, t에서 s가 처음 나타나는 위치를 찾아보라.

> 문자열 검색과 관련된 다양한 알고리즘이 존재하지만, 각각은 장단점이 있어서 어느 특정 알고리즘이 모든 경우에 훌륭하다고 말할 수 없다.
> KMP, Boyer-Moore, Rabin-Karp 알고리즘은 문자열 매칭을 선형 시간에 가능케 한다.

# 무식하게 검색하기

입력이 큰 경우 비효율적이지만, 흔치 않으며 구현이 단순한 장점이 있기 때문에 표준 라이브러리 구현에 널리 사용됨.
c의 strstr(), c++의 string::find(), Java의 indexOf()는 이와 같은 알고리즘을 사용한다.

```cpp
int naiveSearch(const string& t, const string& s) {
    for (int begin = 0; begin + s.size() <= t.size(); ++begin) {
        bool matched = true;
        for (int i = 0; i < s.size(); ++i) {
            if (t[begin + i] != s[i]) {
                matched = false;
                break;
            }
        }
        if (matched) return begin;
    }
    return -1;
}
```

# Rabin-Karp

Rabin-Karp 알고리즘은 지문(fingerprint)의 개념을 사용한다.
문자열 s의 길이를 m이라고 했을 때 텍스트 t에서 길이가 m인 부분 문자열의 해시값을 구한다.
이 해시값이 지문 역할을 하며 해시값을 효율적으로 구하기 위해 가법 해시 함수(incremental hash function)를 사용한다.
즉, 문자를 하나씩 추가해 나가면서 점차적으로 해시값을 구해 나가는 방법이다.
롤링 해시(rolling hash)라고도 한다.
이 해시 함수를 사용하면 부분 문자열의 구간을 옆으로 옮겨 가면서 모든 부분 문자열의 해시값을 빠르게 구해 나갈 수 있다.

예를 들어 {A,C,G,T}로 이루어진 문자열이 있다고 가정하자.
t는 "GACGCCA"이고 s는 "CGC"일 때, "A"는 0, "C"는 1과 같이 문자를 숫자에 대응시킬 수 있다.
해시 함수는 문자열을 정수값으로 바꾼 뒤 31로 나눈 나머지라고 가정하자.
이때 s의 해시값은 $121 mod 31 = 28$이 되고t의
첫 세 글자 "GAC"의 해시값은 $201mod31=15$가 되므로 s는 t의 첫 세 글자와 매칭되지 않는다.
계속해서 "ACG"의 해시값을 만들 때는 가법해시 함수를 사용한다.
즉, 이전 해시값 15에서 200을 뺀 뒤 10을 곱하고 2를 더한 뒤 31로 나눈 나머지를 취한다.
이 값은 12가 되고, s의 해시값28과 매칭되지 않는다.
그 다음 같은 방식으로 "CGC"의 해시값을 구하면 28이 된다. 해시값이 같다고 끝난 건 아니다.
충돌(collision)이 발생할 수도 있으므로 부분 문자열이 s와 매칭되는지 꼭 확인해야 한다.

Rabin-Karp 알고리즘으로 선형 시간에 문자열 매칭을 찾기 위해서는 충돌할 가능성이 적은, 괜찮은 해시 함수가 필요하다.
해시 함수가 충분히 좋을 때 $O(m+n)$이 된다. m : 문자열 s의 길이, n : 텍스트 t의 길이

```cpp
int RabinKarp(const string &t, const string &s) {
    if (s.size() > t.size()) {
        return -1;  // s is not a substring of t.
    }

    const int kBase = 26;
    int t_hash = 0, s_hash = 0;  // Hash codes for the substring of t and s.
    int power_s = 1;             // kBase^|s-1|.
    for (int i = 0; i < s.size(); ++i) {
        power_s = i ? power_s * kBase : 1;
        t_hash = t_hash * kBase + t[i];
        s_hash = s_hash * kBase + s[i];
    }

    for (int i = s.size(); i < t.size(); ++i) {
        // Checks the two substrings are actually equal or not, to protect
        // against hash collision.
        if (t_hash == s_hash && !t.compare(i - s.size(), s.size(), s)) {
            return i - s.size();  // Found a match.
        }

        // Uses rolling hash to compute the new hash code.
        t_hash -= t[i - s.size()] * power_s;
        t_hash = t_hash * kBase + t[i];
    }

    // Tries to match s and t[t.size() - s.size(), t.size() - 1].
    if (t_hash == s_hash && t.compare(t.size() - s.size(), s.size(), s) == 0) {
        return t.size() - s.size();
    }
    return -1;  // s is not a substring of t.
}
```

# KMP(Knuth-Morris-Pratt)

검색 과정에서 얻는 정보를 버리지 않고 잘 활용하면 많은 시간을 절약할 수 있다.
어떤 긴 문자열 t에서 s="aabaabac"를 찾는 경우를 예로 들면
시작위치 i에서부터 N을 맞춰 보니 첫 일곱 글자 "aabaaba"는 서로 일치했지만
여덟 글자에서 불일치가 발생했다고 하면, 시작 위치 중 일부는 답이 될 수 없음을
보지 않아도 알 수 있다.

Figure 1.1을 보면 위치 i에서 일곱 글자가 일치하기 위해서는 H[i...i+6]이 "aabaaba"이어야 한다
그렇다면 i+1에서 시작하는 N은 H와 일치할 수가 없다. s[1]은 a인데 t의 대응하는 글자는 b임을 이미 알고 있기 때문이다.
이렇게 i+6까지의 시작 위치를 하나하나 시도해 보면 답이 될 가능성이 있는 시작 위치는 i+3과 i+6밖에 없다는 것을 알 수 있다.
따라서 시작 위치를 i+3으로 증가시키고 검색을 계속하면 된다.

#### Figure 1.1

<table>
  <tbody>
    <tr>
      <td align="center" ><strong>s,begin=i</strong></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td align="center" style="background-color:lightgray">a</td>
      <td align="center" style="background-color:lightgray">a</td>
      <td align="center" style="background-color:lightgray">b</td>
      <td align="center" style="background-color:lightgray">a</td>
      <td align="center" style="background-color:lightgray">a</td>
      <td align="center" style="background-color:lightgray">b</td>
      <td align="center" style="background-color:lightgray">a</td>
      <td align="center" style="background-color:red"><del>a</del></td>
    </tr>
    <tr>
      <td align="center"><strong>t</strong></td>
      <td align="center">?</td>
      <td align="center">...</td>
      <td align="center">?</td>
      <td align="center" style="background-color:lightgray">a</td>
      <td align="center" style="background-color:lightgray">a</td>
      <td align="center" style="background-color:lightgray">b</td>
      <td align="center" style="background-color:lightgray">a</td>
      <td align="center" style="background-color:lightgray">a</td>
      <td align="center" style="background-color:lightgray">b</td>
      <td align="center" style="background-color:lightgray">a</td>
      <td align="center">?</td>
      <td align="center">...</td>
    </tr>
    <tr>
      <td align="center"><del>s,begin=i+1</del></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td align="center" style="background-color:lightgray">a</td>
      <td align="center" style="background-color:red"><del>a</del></td>
      <td align="center">b</td>
      <td align="center">a</td>
      <td align="center">a</td>
      <td align="center">b</td>
      <td align="center">a</td>
      <td align="center">c</td>
    </tr>
    <tr>
      <td align="center"><del>s,begin=i+2</del></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td align="center" style="background-color:red"><del>a</del></td>
      <td align="center">a</td>
      <td align="center">b</td>
      <td align="center">a</td>
      <td align="center">a</td>
      <td align="center">b</td>
      <td align="center">a</td>
      <td align="center">c</td>
    </tr>
    <tr>
      <td align="center"><strong>s,begin=i+3</strong></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td align="center" style="background-color:lightgray">a</td>
      <td align="center" style="background-color:lightgray">a</td>
      <td align="center" style="background-color:lightgray">b</td>
      <td align="center" style="background-color:lightgray">a</td>
      <td align="center">a</td>
      <td align="center">b</td>
      <td align="center">a</td>
      <td align="center">c</td>
    </tr>
    <tr>
      <td align="center"><del>s,begin=i+4</del></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td align="center" style="background-color:lightgray">a</td>
      <td align="center" style="background-color:red">a</td>
      <td align="center">b</td>
      <td align="center">a</td>
      <td align="center">a</td>
      <td align="center">b</td>
      <td align="center">a</td>
      <td align="center">c</td>
    </tr>
    <tr>
      <td align="center"><del>s,begin=i+5</del></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td align="center" style="background-color:red">a</td>
      <td align="center">a</td>
      <td align="center">b</td>
      <td align="center">a</td>
      <td align="center">a</td>
      <td align="center">b</td>
      <td align="center">a</td>
      <td align="center">c</td>
    </tr>
    <tr>
      <td align="center"><strong>s,begin=i+6</strong></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td style="border:none;"></td>
      <td align="center" style="background-color:lightgray">a</td>
      <td align="center">a</td>
      <td align="center">b</td>
      <td align="center">a</td>
      <td align="center">a</td>
      <td align="center">b</td>
      <td align="center">a</td>
      <td align="center">c</td>
    </tr>
  </tbody>
</table>

## 다음 시작 위치 찾기

KMP 알고리즘은 앞에서도 설명했듯이, 불일치가 일어났을 때 지금까지 일치한 글자의 수를 이용해
다음으로 시도해야 할 시작 위치를 빠르게 찾아낸다.

```cpp
// N에서 자기 자신을 찾으면서 나타나는 부분 일치를 이용해
// pi[]를 계산한다
// pi[i] = N[...i]의 접미사도 되고 접두사도 되는 문자열의 최대 길이
vector<int> getPartialMatch(const string& s) {
    int m = s.size();
    vector<int> pi(m, 0);
    // KMP로 자기 자신을 찾는다.
    // N을 N에서 찾는다. begin=0이면 자기 자신을 찾아버리니까 안됨!
    int begin = 1, matched = 0;
    // 비교할 문자가 N의 끝에 도달할 때까지 찾으면서 부분 일치를 모두 기록한다.
    while (begin + matched < m) {
        if (s[begin + matched] == s[matched]) {
            ++matched;
            pi[begin + matched - 1] = matched;
        } else {
            if (matched == 0)
                ++begin;
            else {
                begin += matched - pi[matched - 1];
                matched = pi[matched - 1];
            }
        }
    }
    return pi;
}
```

## KMP

지금까지 대응된 문자의 수 matched만을 유지하면서 모든 글자를 순회하고, 각 글자마다 matched를 적절하게 갱신함.

```cpp
int kmpSearch(const string &t, const string &s) {
  if (s.size() > t.size()) {
    return -1; // s is not a substring of t.
  }
  if (s.empty())
    return 0;

  int n = t.size(), m = s.size();
  vector<int> pi = getPartialMatch(s);
  // 현재 대응된 글자의 수
  int matched = 0;
  // 짚더미의 각 글자를 순회한다
  for (int i = 0; i < n; i++) {
    // matched번 글자와 짚더미의 해당 글자가 불일치할 경우,
    // 현재 대응된 글자의 수를 pi[matched-1]로 줄인다.
    while (matched > 0 && t[i] != s[matched])
      matched = pi[matched - 1];

    if (t[i] == s[matched]) {
      ++matched;
      if (matched == m)
        return i - m + 1;
    }
  }
  return -1;
}
```

# Reference

"프로그래밍 대회에서 배우는 알고리즘 문제해결 전략" by 구종만
