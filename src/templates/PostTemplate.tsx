import React, { useEffect } from "react";
import Main from "../components/Main";
import Post from "../components/Post";
import { useDispatch } from "react-redux";
import { graphql } from "gatsby";
import Seo from "../components/Seo";
import { FluidObject } from "gatsby-image";

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
    cover: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
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
        date(formatString: "dddd, MMMM Do YYYY, h:m  A")
        cover {
          publicURL
          childImageSharp {
            fluid(quality: 100, srcSetBreakpoints: [30, 60, 80, 200]) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
