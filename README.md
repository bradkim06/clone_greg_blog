# bradkim06's Gatsby Blog

## Introduce

This blog is not my pure creation, but was created with reference to <a href="https://github.com/greglobinski/gatsby-starter-personal-blog"> greg lobinski's starter</a>. I like this starter. Thank greg lobinski for providing a beautiful design starter as open source.

[greg lobinsky's Original Demo Site](https://gatsby-starter-personal-blog.greglobinski.com/).

[My Custom Demo Site](https://bradkim06.github.io).

## The difference between Original and Custom

|                         | Original  |      Custom      |
| :---------------------: | :-------: | :--------------: |
|      **Markdown**       |    .md    |    .md & .mdx    |
|        **style**        | react-jss | styled component |
| **component file type** |    js     |    TypeScript    |
|     **Search Tool**     |  Algoria  |     fuse.js      |
|  **FullScreen Button**  |     O     |        X         |
|    **Theme Toggle**     |     X     |        O         |
|    **Post Comment**     | Facebook  |    Utterance     |

## Quick Start

Use the Gatsby CLI to create a new site.

### Prerequisites

yarn

```bash
# npm
npm install --global gatsby-cli
# yarn
yarn global add gatsby-cli
```

### Install & Run

```bash
# Install Starter
gatsby new [NEW_SITE_DIRECTORY_NAME] https://github.com/bradkim06/clone_greg_blog

# Go into the newly created directory and run
cd [NEW_SITE_DIRECTORY_NAME]
# http://localhost:8000
gatsby develop
```

You can write post both _.md, _.mdx

```bash
[NEW_SITE_DIRECTORY_NAME]/content/posts/*.md
# or
[NEW_SITE_DIRECTORY_NAME]/content/posts/*.mdx
```

## Demo

### Original

![demogif](./static/gatsby-starter-personal-blog.gif)

### Custom

![demoImg](./static/demo-img.png)

### LightHouse Score

![LightHouse Score](./static/lightHoust.jpg)
