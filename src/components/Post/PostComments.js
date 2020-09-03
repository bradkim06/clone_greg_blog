import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";
import { DiscussionEmbed } from "disqus-react";

const StyledComments = styled.div`
  margin: 3em 0 0;
  padding: 3em 0 0;

  #disqus_thread {
    position: relative;
  }
  #disqus_thread:after {
    content: "";
    display: block;
    height: 55px;
    width: 100%;
    position: absolute;
    bottom: 0;
  }
`;

const PostComments = () => {
  const { mdx } = useCommentData();

  let disqusConfig = {
    shortname: "bradkim06",
    config: {
      url: "https://bradkim06.github.io" + mdx.fields.slug,
      title: mdx.frontmatter.title,
      identifier: mdx.id,
    },
  };

  return (
    <StyledComments>
      <DiscussionEmbed
        shortname={disqusConfig.shortname}
        config={disqusConfig.config}
      />
    </StyledComments>
  );
};

const useCommentData = () => {
  let commentData = useStaticQuery(
    graphql`
      query CommentData($slug: String) {
        mdx(fields: { slug: { eq: $slug } }) {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    `
  );
  return commentData;
};

export default PostComments;
