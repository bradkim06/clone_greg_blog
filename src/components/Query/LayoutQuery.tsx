import { useStaticQuery, graphql } from "gatsby";

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
        subTitle: string;
        category: string;
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
