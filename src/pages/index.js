import React from "react";
import Main from "../components/Main/Main";
import Article from "../components/Main/Article";
import PageHeader from "../components/Page/PageHeader";

export default function Home() {
  return (
    <Main>
      <Article>
        <PageHeader title="Index" />
        <h1> Hello Index!</h1>
      </Article>
    </Main>
  );
}
