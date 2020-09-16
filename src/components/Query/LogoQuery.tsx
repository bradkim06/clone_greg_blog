import { useStaticQuery, graphql } from "gatsby";
import { FluidObject } from "gatsby-image";

export type logoProps = {
  logo: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

export const useLogoQuery = () => {
  const logoData = useStaticQuery(
    graphql`
      query LogoData {
        logo: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fluid(quality: 100, srcSetBreakpoints: [30, 60, 80, 200]) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  );

  return logoData;
};
