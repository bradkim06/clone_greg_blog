import React from "react";

import Main from "../components/Main/Main";
import Article from "../components/Main/Article";
import Content from "../components/Main/Content";
import PageHeader from "../components/Page/PageHeader";

const NotFoundPage = () => (
  <Main>
    <Article>
      <PageHeader title="About" />
      <Content>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Content>
    </Article>
  </Main>
);

export default NotFoundPage;
