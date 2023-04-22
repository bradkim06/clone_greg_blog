---
title: 문제8.1 최대값 찾는 API로 스택 구현하기
subTitle: stack_with_max
category: algorithm
date: 2023-04-22T10:53:09
cover: ../cover.jpeg
---

max 연산을 제공하는 스택 클래스를 설계하라. max() 메서드는 스택에 저장된 원소 중에서 가장 값이 큰 원소를 반환한다.

```cpp
template <typename T>
class Stack {
   private:
    struct ElementWithCachedMax {
        T element, max;
    };
    stack<ElementWithCachedMax> element_with_cached_max_;

   public:
    bool Empty() const { return element_with_cached_max_.empty(); }
    T Max() const { return element_with_cached_max_.top().max; }
    T Pop() {
        int pop_element = element_with_cached_max_.top().element;
        element_with_cached_max_.pop();
        return pop_element;
    }
    void Push(T x) {
        element_with_cached_max_.emplace(
            ElementWithCachedMax{x, max(x, Empty() ? x : Max())});
    }
};
```
