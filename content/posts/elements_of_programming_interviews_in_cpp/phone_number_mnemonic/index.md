---
title: 문제15.2 전화번호에 대한 모든 연상기호 계산하기
subTitle: phone_number_mnemonic
category: algorithm
date: 2023-04-24T20:31:52
cover: ../cover.jpeg
---

# 문제

Figure 1과 같이 전화 키패드에서 0과 1을 제외한 각 숫자는 알파벳의 세 개 또는 네 개 문자 중 하나에 해당한다. 단어는 숫자보다 기억하기 쉽기 때문에, 7자리 또는 10자리 전화번호를 영어 단어로 표현해 볼 수 있다. 예를 들어 "2276696"은 "ACRONYM"이나 "ABPOMZN"으로 나타낼 수 있다. 이렇게 숫자를 기억하기 쉽도록 문자로 매칭한 것을 연상기호(mnemonics)라 한다.

#### Figure 1

|         |        |         |
| ------- | ------ | ------- |
| 1       | 2(ABC) | 3(DEF)  |
| 4(GHI)  | 5(JKL) | 6(MNO)  |
| 7(PQRS) | 8(TUV) | 9(WXYZ) |
| \*      | 0      | #       |

숫자 문자열로 이루어진 전화번호를 입력받아서 각 숫자에 해당하는 모든 가능한 문자 집합을 반환하는 프로그램을 작성하라. 휴대 전화 키패드는 숫자를 가져와 해당 문자 집합을 반환하는 매핑으로 지정된다. 문자 집합이 올바른 단어이거나 구(phrase)일 필요는 없다.

# 해답

```cpp
#include <bits/stdc++.h>
using namespace std;

template <class T>
std::ostream& operator<<(std::ostream& stream, const std::vector<T>& values) {
    copy(begin(values), end(values), std::ostream_iterator<T>(stream, " "));
    return stream;
}

const int kNumTelDigits = 10;
const array<string, kNumTelDigits> kMapping = {
    {"0", "1", "ABC", "DEF", "GHI", "JKL", "MNO", "PQRS", "TUV", "WXYZ"}};

vector<string> PhoneMnemonic(const string& phone_number) {
    vector<string> mnemonics;
    string partial_mnemonic(phone_number.size(), 0);

    function<void(int)> PhoneMnemonicHelper = [&](int depth) {
        if (depth == phone_number.size()) {
            mnemonics.emplace_back(partial_mnemonic);
            return;
        }

        for (char c : kMapping[phone_number[depth] - '0']) {
            partial_mnemonic[depth] = c;
            PhoneMnemonicHelper(depth + 1);
        }
    };

    PhoneMnemonicHelper(0);
    return mnemonics;
}

int main() {
    cout << PhoneMnemonic("199");

    return 0;
}
```
