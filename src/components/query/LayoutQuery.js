import { useStaticQuery, graphql } from "gatsby";

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
        posts: allMdx(filter: { fileAbsolutePath: { regex: "//posts//" } }) {
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
