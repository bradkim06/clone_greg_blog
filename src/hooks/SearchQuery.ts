import { useStaticQuery, graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

type AllMdxProps = {
  allMdx: {
    edges: Array<{
      node: {
        id: string;
        excerpt: string;
        fields: {
          slug: string;
        };
        headings: {
          value: string;
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
};

const useSearchData = (): AllMdxProps => {
  const searchData = useStaticQuery(
    graphql`
      query SearchData {
        allMdx(sort: { fields: frontmatter___date, order: DESC }) {
          edges {
            node {
              id
              excerpt
              fields {
                slug
              }
              headings {
                value
              }
              frontmatter {
                title
                subTitle
                date(formatString: "YYYY.MM.D")
                category
                cover {
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
      }
    `,
  );
  return searchData;
};

export default useSearchData;
