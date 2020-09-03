import React from "react";
import PropTypes from "prop-types";
import Article from "../Main/Article";
import PostHeader from "./PostHeader";
import Content from "../Main/Content";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "gatsby";

const postPropTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired,
};

function Post({ post }) {
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
    </Article>
  );
}

const shortcodes = { Link }; // Provide common components here

Post.propTypes = postPropTypes;
export default Post;
