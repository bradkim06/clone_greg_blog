import React from "react";
import { StaticQuery, graphql } from "gatsby";

const ComponentName = () => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => {
      JSON.stringify(data, null, 4);
    }}
  ></StaticQuery>
);

export default ComponentName;
