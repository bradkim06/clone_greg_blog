import React from "react";
import Article from "../Main/Article";
import PostHeader from "./Header";
import PostFooter from "./Footer";
import Content from "../Main/Content";
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

const Post = ({ post }: PostProps) => {
  const { title, subTitle } = post.frontmatter;
  const { prefix } = post.fields;
  const { body } = post;

  return (
    <Article>
      <PostHeader title={title} subTitle={subTitle} date={prefix} />
      <Content>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </Content>
      <PostFooter />
    </Article>
  );
};

const shortcodes = { Link }; // Provide common components here

export default Post;
