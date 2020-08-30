import React from "react";
import PropTypes from "prop-types";
import Article from "../Main/Article";
import PostHeader from "./PostHeader";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "gatsby";

const shortcodes = { Link }; // Provide common components here

function Post({ post }) {
  return (
    <Article>
      <PostHeader
        title={post.frontmatter.title}
        subTitle={post.frontmatter.subTitle}
        date={post.fields.prefix}
      />
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{post.body}</MDXRenderer>
      </MDXProvider>
    </Article>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired,
};

export default Post;
