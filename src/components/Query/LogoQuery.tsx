import { useStaticQuery, graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';

export type LogoProps = {
  childImageSharp: {
    fluid: FluidObject;
  };
};

type LogoQueryType = {
  logo: LogoProps;
};

export const useLogoQuery = (): LogoQueryType => {
  const logoData = useStaticQuery(
    graphql`
      query LogoData {
        logo: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fluid(srcSetBreakpoints: [50, 80, 100, 150]) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `,
  );

  return logoData;
};
