import React, { useEffect } from "react";
import Main from "../components/Main";
import Post from "../components/Post";
import { useDispatch } from "react-redux";
import { graphql } from "gatsby";
import Seo from "../components/Seo";

import { moveNavAside, moveNavData } from "../utils/shared";

require("prismjs/themes/prism-okaidia.css");

type PostTemplateProps = {
  data: {
    mdx: {
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
};

export default ({ data }: PostTemplateProps) => {
  const state = moveNavData();
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.navigatorPosition === "is-featured") {
      moveNavAside(state, dispatch);
    }
  }, []);

  return (
    <Main>
      <Seo data={data.mdx} />
      <Post post={data.mdx} />
    </Main>
  );
};

export const postQuery = graphql`
  query BlogPostQuery($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      fields {
        slug
        prefix
      }
      frontmatter {
        title
        subTitle
      }
    }
  }
`;
