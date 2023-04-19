import React, { ReactElement } from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby';
import PostWrapper from '../Main/Wrapper';
import PostHeader from './Header';
import PostFooter from './Footer';
import Article from '../Main/Article';
import Code, { InlineCode } from '../Code';
import { MdxType } from '../../state/store';

type PostProps = {
  post: MdxType;
};

const components = {
  Link,
  inlineCode: InlineCode,
  code: Code,
}; // Provide common components here

function Post({ post }: PostProps): ReactElement {
  const { title, subTitle } = post.frontmatter;
  const { date } = post.frontmatter;
  const { body } = post;

  return (
    <PostWrapper>
      <PostHeader title={title} subTitle={subTitle} date={date} />
      <Article>
        <MDXProvider components={components}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </Article>
      <PostFooter />
    </PostWrapper>
  );
}

export default Post;
