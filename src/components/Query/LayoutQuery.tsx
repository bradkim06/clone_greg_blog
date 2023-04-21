import { useStaticQuery, graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

export type PostsProps = {
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
        cover?: {
          childImageSharp: {
            fluid: FluidObject;
          };
        };
      };
    };
  }>;
};

export type PagesProps = {
  edges: Array<{
    node: {
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
      };
    };
  }>;
};

type LayoutQueryType = {
  posts: PostsProps;
  pages: PagesProps;
};

export const useLayoutQuery = (): LayoutQueryType => {
  const layoutData = useStaticQuery(
    graphql`
      query LayoutData {
        posts: allMdx(
          filter: { fileAbsolutePath: { regex: "//posts//" } }
          sort: { fields: frontmatter___date, order: DESC }
        ) {
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
                date(formatString: "YYYY.MM.D")
                category
                cover {
                  publicURL
                  childImageSharp {
                    fluid(srcSetBreakpoints: [50, 80, 100, 150]) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
        pages: allMdx(filter: { fileAbsolutePath: { regex: "//pages//" } }) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `,
  );
  return layoutData;
};
