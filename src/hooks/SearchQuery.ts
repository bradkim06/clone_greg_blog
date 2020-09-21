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
        allMdx {
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
      }
    `,
  );
  return searchData;
};

export default useSearchData;
