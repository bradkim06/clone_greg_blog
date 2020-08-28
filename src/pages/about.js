import React from "react";
import Main from "../components/Main/Main";
import Article from "../components/Main/Article";
import PageHeader from "../components/Page/PageHeader";

export default function About() {
  return (
    <Main>
      <Article>
        <PageHeader title="About" />
        This website made with Gatsby is not my creation. This site is a
        modified of{" "}
        <a href="https://github.com/greglobinski/gatsby-starter-personal-blog">
          greg lobinski's starter.{" "}
        </a>
        I like this starter, but it doesn't work on Gatsby V2. So I moved this
        starter to V2 with some changes.
      </Article>
    </Main>
  );
}
