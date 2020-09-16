import { useStaticQuery, graphql } from "gatsby";
import { FluidObject } from "gatsby-image";

export interface PostsProps {
  totalCount: number;
  edges: Array<{
    node: {
      id: string;
      excerpt: string;
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
        subTitle?: string;
        date?: string;
        category?: string;
        cover: {
          childImageSharp: {
            fluid: FluidObject;
          };
        };
      };
    };
  }>;
}

export interface PagesProps {
  edges: Array<{
    node: {
      frontmatter: {
        title: string;
      };
    };
  }>;
}

export const useLayoutQuery = () => {
  const layoutData = useStaticQuery(
    graphql`
      query LayoutData {
        posts: allMdx(filter: { fileAbsolutePath: { regex: "//posts//" } }) {
          totalCount
          edges {
            node {
              id
              excerpt
              fields {
                slug
              }
              frontmatter {
                title
                subTitle
                date
                category
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
        }
        pages: allMdx(filter: { fileAbsolutePath: { regex: "//posts//" } }) {
          edges {
            node {
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );
  return layoutData;
};
