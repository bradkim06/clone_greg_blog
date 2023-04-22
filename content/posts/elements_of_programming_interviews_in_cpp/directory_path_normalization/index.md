---
title: 문제8.4 경로 이름 표준화하기
subTitle: directory_path_normalization
category: algorithm
date: 2023-04-22T12:32:36
cover: ../cover.jpeg
---

파일 혹은 디렉터리에는 문자열로 이루어진 경로가 존재한다.
그 경로는 루트에서 시작하는 절대 경로(예를 들어 /usr/bin/gcc)일 수도 있고,
현재 디렉터리에서 시작하는 상대 경로(예를 들어 script/awkscripts)일 수도 있다.

같은 디렉터리는 여러 가지 방법으로 경로를 표현할 수 있다.
예를 들어 "/usr/lib/../bin/gcc"와 "scripts//./../scripts/awkscripts/././"는
앞에서 예로 든 절대 경로와 상대 경로를 나타낸다.

경로가 주어졌을 때 같은 경로를 나타내는 가장 짧은 경로를 반환하라.
각 디렉터리와 파일의 이름은 알파벳과 숫자로만 이루어졌다고 가정해도 좋다.
하위디렉터리의 이름은 슬래시'/', 현재 디렉터리'.',
부모 디렉터리 '..'의 조합으로 나타낼 수 있다.

```cpp
string ShortestEquivalentPath(const string& path) {
    if (path.empty()) return "";

    vector<string> path_names;  // Uses vector as a stack.
    // Special case: starts with "/", which is an absolute path.
    if (path.front() == '/') {
        path_names.emplace_back("/");
    }

    stringstream ss(path);
    string token;
    while (getline(ss, token, '/')) {
        // 공백이나 현재 디렉터리는 생략
        if (token == "." || token == "") continue;

        // 공백, 현재, 하위 디렉터리가 아니면 올바른 입력
        if (token != "..") {
            path_names.emplace_back(token);
            continue;
        }

        // ".."는 상대 경로인 경우 비어있으면 무한대로 가능
        if (path_names.empty() || path_names.back() == "..") {
            path_names.emplace_back(token);
            continue;
        }

        // 절대 경로는 root에서 ".." 불가능
        if (path_names.back() == "/") return "";

        path_names.pop_back();
    }

    string result;
    if (!path_names.empty()) result += path_names.front();
    for (int i = 1; i < path_names.size(); i++) {
        if (i == 1 && result == "/") {  // Avoid starting "//".
            result += path_names[i];
        } else {
            result += "/" + path_names[i];
        }
    }

    return result;
}
```
