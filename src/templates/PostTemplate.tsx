import React, { useEffect } from "react";
import Main from "../components/Main";
import Post from "../components/Post";
import { useDispatch } from "react-redux";
import { graphql } from "gatsby";
import Seo from "../components/Seo";

import { setCurrentPost } from "../state/store";
import { moveNavAside, moveNavData } from "../utils/shared";

require("prismjs/themes/prism-okaidia.css");

export type MdxType = {
  id: string;
  body: string;
  excerpt: string;
  tableOfContents?: {
    items?: object[];
  };
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    subTitle: string;
    date: string;
  };
};

export type PostTemplateProps =
  | {
      data: {
        mdx: MdxType;
      };
    }
  | any;

export default ({ data }: PostTemplateProps) => {
  const state = moveNavData();
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.navigatorPosition === "is-featured") {
      moveNavAside(state, dispatch);
    }

    dispatch(setCurrentPost(data));
  }, []);

  return (
    <Main>
      <Seo post={data.mdx} />
      <Post post={data.mdx} />
    </Main>
  );
};

export const postQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      excerpt
      tableOfContents(maxDepth: 3)
      fields {
        slug
      }
      frontmatter {
        title
        subTitle
        date
      }
    }
  }
`;
