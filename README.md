# bradkim06's Gatsby Blog

## Introduce

This blog is not my pure creation, but was created with reference to <a href="https://github.com/greglobinski/gatsby-starter-personal-blog"> greg lobinski's starter</a>.

[greg lobinsky's Original Demo Site](https://gatsby-starter-personal-blog.greglobinski.com/).

[My Custom Site](https://bradkim06.github.io).

## The difference between Original and Custom

|                         | Original  |      Custom      |
| :---------------------: | :-------: | :--------------: |
|      **Markdown**       |    .md    |    .md & .mdx    |
|        **style**        | react-jss | styled component |
| **component file type** |    js     |    TypeScript    |
|     **Search Tool**     |  Algoria  |     fuse.js      |
|    **Post Comment**     | Facebook  |    Utterance     |
|   **Gatsby Version**    |    1~2    |        3         |

## Add Blog Functions

- Theme Dark, White Toggle
- Table of contents button

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

### LightHouse Score

![LightHouse Score](./static/lightHoust.jpg)
