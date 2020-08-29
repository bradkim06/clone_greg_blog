import React from "react";
import Main from "../components/Main/Main";
import Article from "../components/Main/Article";
import Content from "../components/Main/Content";
import PageHeader from "../components/Page/PageHeader";

export default function About() {
  return (
    <Main>
      <Article>
        <PageHeader title="About" />
        <Content>
          I'm embedded developer in South Korea.
          <br />
          This website made with{" "}
          <a href="https://github.com/greglobinski/gatsby-starter-personal-blog">
            greg lobinski's starter
          </a>{" "}
          not my creation. I like this starter, but it only work on Gatsby v1.
          So I port this starter to gatsby v2 with some changes. Thank greg
          lobinski for providing a beautiful starter as open source.{" "}
        </Content>
      </Article>
    </Main>
  );
}
