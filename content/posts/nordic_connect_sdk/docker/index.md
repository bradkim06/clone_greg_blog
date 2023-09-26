---
title: Nordic Connect SDK Docker
subTitle: NCS build 환경 Docker 구축
category: Nordic Connect SDK
date: 2023-09-26T16:56:00
cover:
---

NCS(Nordic Connect SDK v2.4.2) 개발환경을 다음과 같은 이유로 도커로 구축했다.

- 개발환경 통일, 공유
- 추후 CI,CD 환경 구축

도커 환경에서 편집 & 빌드는 가능하지만 M1 MacPro를 사용하기 때문에 Container환경에서 Flash가 불가능하다(Host USB Device 접근 불가능). Flash 동작은 Host에서 구축 필요

편집 환경은 neovim 환경으로 구축했으므로 다른 편집기 사용시 Dockerfile.ncs를 base로 Docker Image 생성하면 된다.

[ncs-build-docker github link](https://github.com/bradkim06/ncs-build-docker)
