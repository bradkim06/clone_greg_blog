import { useStaticQuery, graphql } from "gatsby";

export const useSiteMetadata = () => {
  const layoutData = useStaticQuery(
    graphql`
      query LayoutData {
        site {
          siteMetadata {
            title
          }
          id
        }
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
      }
    `
  );
  return layoutData;
};
