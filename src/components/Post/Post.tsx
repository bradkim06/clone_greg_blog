import React from "react";
import PostWrapper from "../Main/Wrapper";
import PostHeader from "./Header";
import PostFooter from "./Footer";
import Article from "../Main/Article";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "gatsby";
import { MdxType } from "../../templates/PostTemplate";

type PostProps = {
  post: MdxType;
};

export default ({ post }: PostProps) => {
  const { title, subTitle } = post.frontmatter;
  const { date } = post.frontmatter;
  const { body } = post;

  return (
    <PostWrapper>
      <PostHeader title={title} subTitle={subTitle} date={date} />
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
