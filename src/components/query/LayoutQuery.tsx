import { useStaticQuery, graphql } from "gatsby";

export interface PostsProps {
  totalCount: number;
  edges: Array<{
    node: {
      excerpt: string;
      slug: string;
      fields: {
        slug: string;
        prefix: string;
      };
      frontmatter: {
        title: string;
        subTitle?: string;
        category?: string;
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
              excerpt
              slug
              fields {
                slug
                prefix
              }
              frontmatter {
                title
                subTitle
                category
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
