import React, { ReactElement } from 'react';
import Main from '../components/Main';
import PostWrapper from '../components/Main/Wrapper';
import Article from '../components/Main/Article';
import PageHeader from '../components/Post/Header';

function NotFound(): ReactElement {
  return (
    <Main>
      <PostWrapper>
        <Article>
          <PageHeader title="404 Error: Page not Found" />
          404 Error: Page not Found
        </Article>
      </PostWrapper>
    </Main>
  );
}

export default NotFound;
