import { useStaticQuery, graphql } from "gatsby";

export type logoProps = {
  logo: any;
};

export const useLogoQuery = () => {
  const logoData = useStaticQuery(
    graphql`
      query LogoData {
        logo: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  );

  return logoData;
};
