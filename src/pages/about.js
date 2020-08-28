import React from "react";
import Main from "../components/Main/Main";
import Article from "../components/Main/Article";
import PageHeader from "../components/Page/PageHeader";

function About() {
  return (
    <Main>
      <Article>
        <PageHeader title="About" />
        <h1> Hello About!</h1>
      </Article>
    </Main>
  );
}

export default About;
