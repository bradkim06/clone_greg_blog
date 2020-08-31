import { graphql, useStaticQuery } from "gatsby";
import { resolveLink } from "../../util/url";

export function useSidebar() {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return data;
}
