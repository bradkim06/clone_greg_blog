import React, { useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const StyledComments = styled.div`
  margin: 3em 0 0;
  padding: 3em 0 0;
`;

const PostComments = () => {
  const { mdx } = useCommentData();
  const stateTheme = useSelector(state => state.themeToggle);
  const themeSelect = stateTheme ? "photon-dark" : "github-light";

  useEffect(() => {
    const script = document.createElement("script");
    const anchor = document.getElementById("inject-comments-for-uterances");
    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", true);
    script.setAttribute("repo", "bradkim06/utterances");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", themeSelect);
    if (anchor.hasChildNodes()) {
      anchor.removeChild(anchor.firstChild);
    }
    anchor.appendChild(script);
  }, [themeSelect]);

  return (
    <StyledComments>
      <section id="inject-comments-for-uterances"></section>
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
