---
title: 문제8.6 깊이 순서대로 이진 트리의 노드 구하기
subTitle: tree_level_order
category: algorithm
date: 2023-04-22T13:59:12
cover: ../cover.jpeg
---

이진 트리가 주어졌을 때 같은 높이의 키값들을 배열로 반환하라. 키값은 노드의 깊이 순서대로 나타나야 하며, 높이가 같은 경우에는 왼쪽에서 오른쪽 순서대로 나타나야 한다. 예를 들어 Figure 1과 같은 이진 트리가 주어졌을 때 <<314>, <6,6>, <271,561,2,271>, <28,0,3,1,28>, <17,401,257>, <641>>을 반환해야 한다.

#### Figure 1

import { Mermaid } from 'mdx-mermaid/Mermaid';

<Mermaid chart={`graph TB; A(314)-->B(6); A-->I(6); B-->C(271); B-->F(561); I-->J(2); I-->O(271); C-->D(28); C-->E(0); F-->G(3); G-->H(17); J-->K(1);K-->L(401);K-->N(257); L-->M(641); O-->P(28); `} />

# 해법

```cpp lineNumbers=true {16-45}
#include <bits/stdc++.h>

using namespace std;

template <typename T>
struct BinaryTreeNode {
    T data;
    unique_ptr<BinaryTreeNode<T>> left, right;

    explicit BinaryTreeNode(const T &data) : data(data) {}
    BinaryTreeNode(T data, unique_ptr<BinaryTreeNode<T>> left,
                   unique_ptr<BinaryTreeNode<T>> right)
        : data(data), left(std::move(left)), right(std::move(right)) {}
};

vector<vector<int>> BinaryTreeDepthOrder(
    const unique_ptr<BinaryTreeNode<int>> &tree) {
    vector<vector<int>> result;
    if (!tree.get()) {
        return result;
    }

    queue<BinaryTreeNode<int> *> curr_depth_nodes({tree.get()});
    while (!curr_depth_nodes.empty()) {
        queue<BinaryTreeNode<int> *> next_depth_nodes;
        vector<int> this_level;
        while (!curr_depth_nodes.empty()) {
            auto curr = curr_depth_nodes.front();
            curr_depth_nodes.pop();
            this_level.emplace_back(curr->data);

            if (curr->left) {
                next_depth_nodes.emplace(curr->left.get());
            }
            if (curr->right) {
                next_depth_nodes.emplace(curr->right.get());
            }
        }

        if ((result.size() & 1)) reverse(this_level.begin(), this_level.end());
        result.emplace_back(this_level);
        curr_depth_nodes = next_depth_nodes;
    }
    return result;
}

int main() {
    vector<string> testData{
        "314",  "6",    "6",    "271", "561",  "2",    "271",  "28",   "0",
        "null", "3",    "null", "1",   "null", "28",   "null", "null", "null",
        "null", "null", "17",   "401", "257",  "null", "null", "null", "641"};
    int idx = 0;
    std::unique_ptr<BinaryTreeNode<int>> root =
        std::make_unique<BinaryTreeNode<int>>(stoi(testData[idx++]));
    queue<BinaryTreeNode<int> *> curr({root.get()});

    while (!curr.empty()) {
        auto tree = curr.front();
        curr.pop();
        if (idx < testData.size() && testData[idx] != "null") {
            tree->left =
                std::make_unique<BinaryTreeNode<int>>(stoi(testData[idx]));
            curr.push(tree->left.get());
        }
        idx++;

        if (idx < testData.size() && testData[idx] != "null") {
            tree->right =
                std::make_unique<BinaryTreeNode<int>>(stoi(testData[idx]));
            curr.push(tree->right.get());
        }
        idx++;
    }

    auto res = BinaryTreeDepthOrder(root);

    cout << "<";
    for (int i = 0; i < res.size(); i++) {
        cout << "<";
        for (int j = 0; j < res[i].size(); j++) {
            cout << res[i][j];
            if (j != res[i].size() - 1) cout << ",";
        }
        cout << ">";
        if (i != res.size() - 1) cout << ", ";
    }
    cout << ">";

    return 0;
}
```

## 응용: 이진 트리가 입력으로 주어졌을 때 키값을 트리의 위에서부터 한 번은 왼쪽에서 오른쪽으로, 한 번은 오른쪽에서 왼쪽으로 번갈아 반환하는 프로그램을 작성하라.

예를 들어 Figure 1이 입력으로 주어지면 <<314>, <6,6>, <271,561,2,271>, <28,1,3,0,28>, <17,401,257>, <641>>을 반환한다.

```cpp lineNumbers=true {25}
vector<vector<int>> BinaryTreeDepthOrder(
    const unique_ptr<BinaryTreeNode<int>> &tree) {
    vector<vector<int>> result;
    if (!tree.get()) {
        return result;
    }

    queue<BinaryTreeNode<int> *> curr_depth_nodes({tree.get()});
    while (!curr_depth_nodes.empty()) {
        queue<BinaryTreeNode<int> *> next_depth_nodes;
        vector<int> this_level;
        while (!curr_depth_nodes.empty()) {
            auto curr = curr_depth_nodes.front();
            curr_depth_nodes.pop();
            this_level.emplace_back(curr->data);

            if (curr->left) {
                next_depth_nodes.emplace(curr->left.get());
            }
            if (curr->right) {
                next_depth_nodes.emplace(curr->right.get());
            }
        }

        if ((result.size() & 1)) reverse(this_level.begin(), this_level.end());
        result.emplace_back(this_level);
        curr_depth_nodes = next_depth_nodes;
    }
    return result;
}

//<<314>, <6,6>, <271,561,2,271>, <28,1,3,0,28>, <17,401,257>, <641>>
```

## 응용: 이진 트리가 입력으로 주어졌을 때 키값을 트리의 아래에서부터, 왼쪽에서 오른쪽 순서대로 출력하는 프로그램을 작성하라.

예를 들어 Figure 1이 주어졌을 때 <<641>, <17,401,257>, <28,0,3,1,28>, <271,561,2,271>, <6,6>, <314>>를 반환한다.

```cpp lineNumbers=true {8,26,30-33}
vector<vector<int>> BinaryTreeDepthOrder(
    const unique_ptr<BinaryTreeNode<int>> &tree) {
    vector<vector<int>> result;
    if (!tree.get()) {
        return result;
    }

    stack<vector<int>> st;
    queue<BinaryTreeNode<int> *> curr_depth_nodes({tree.get()});
    while (!curr_depth_nodes.empty()) {
        queue<BinaryTreeNode<int> *> next_depth_nodes;
        vector<int> this_level;
        while (!curr_depth_nodes.empty()) {
            auto curr = curr_depth_nodes.front();
            curr_depth_nodes.pop();
            this_level.emplace_back(curr->data);

            if (curr->left) {
                next_depth_nodes.emplace(curr->left.get());
            }
            if (curr->right) {
                next_depth_nodes.emplace(curr->right.get());
            }
        }

        st.emplace(this_level);
        curr_depth_nodes = next_depth_nodes;
    }

    while (!st.empty()) {
        result.emplace_back(st.top());
        st.pop();
    }

    return result;
}
```

## 응용: 이진 트리가 입력으로 주어졌을 때 같은 높이의 키값의 평균을 반환하는 프로그램을 작성하라.

예를 들어 Figure 1이 주어졌을 때 <314, 6, 276.25, 12, 225, 641>을 반환한다.

```cpp lineNumbers=true {15-16,26}
vector<double> BinaryTreeDepthOrder(
    const unique_ptr<BinaryTreeNode<int>> &tree) {
    vector<double> result;
    if (!tree.get()) {
        return result;
    }

    queue<BinaryTreeNode<int> *> curr_depth_nodes({tree.get()});
    while (!curr_depth_nodes.empty()) {
        queue<BinaryTreeNode<int> *> next_depth_nodes;
        double sum = 0, count = 0;
        while (!curr_depth_nodes.empty()) {
            auto curr = curr_depth_nodes.front();
            curr_depth_nodes.pop();
            sum += curr->data;
            count++;

            if (curr->left) {
                next_depth_nodes.emplace(curr->left.get());
            }
            if (curr->right) {
                next_depth_nodes.emplace(curr->right.get());
            }
        }

        result.emplace_back(static_cast<double>(sum / count));
        curr_depth_nodes = next_depth_nodes;
    }
    return result;
}
```
