import React from "react";
import PostWrapper from "../Main/Wrapper";
import PostHeader from "./Header";
import PostFooter from "./Footer";
import Article from "../Main/Article";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { MdxType } from "../../templates/PostTemplate";
import { Link } from "gatsby";
import Code from "../Code";

type PostProps = {
  post: MdxType;
};

const components = {
  Link,
  inlineCode: props => <code className="inline-code" {...props} />,
  code: Code
}; // Provide common components here

export default ({ post }: PostProps) => {
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
};
