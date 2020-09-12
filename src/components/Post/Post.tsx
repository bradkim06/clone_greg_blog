import React from "react";
import PostWrapper from "../Main/Wrapper";
import PostHeader from "./Header";
import PostFooter from "./Footer";
import Article from "../Main/Article";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "gatsby";

type PostProps = {
  post: {
    body: string;
    fields: {
      slug: string;
      prefix: string;
    };
    frontmatter: {
      title: string;
      subTitle: string;
    };
  };
};

export default ({ post }: PostProps) => {
  const { title, subTitle } = post.frontmatter;
  const { prefix } = post.fields;
  const { body } = post;

  return (
    <PostWrapper>
      <PostHeader title={title} subTitle={subTitle} date={prefix} />
      <Article>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </Article>
      <PostFooter />
    </PostWrapper>
  );
};

const shortcodes = { Link }; // Provide common components here
