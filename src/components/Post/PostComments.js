import React, { useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";

const StyledComments = styled.div`
  margin: 3em 0 0;
  padding: 3em 0 0;
`;

const PostComments = () => {
  const { mdx } = useCommentData();

  useEffect(() => {
    let script = document.createElement("script");
    let anchor = document.getElementById("inject-comments-for-uterances");
    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", true);
    script.setAttribute("repo", "bradkim06/utterances");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", "photon-dark");
    anchor.appendChild(script);
  }, []);

  return (
    <StyledComments>
      <div id="inject-comments-for-uterances"></div>
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
