import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

type TocProps = {
  toc: {
    items?: object[];
  };
  linkOnClick: () => void;
};

export default ({ toc, linkOnClick }: TocProps) => {
  return (
    <TocWrapper>
      <h2>Table of contents</h2>
      {toc &&
        toc.items &&
        toc.items.map((h1: any) => (
          <ul>
            <H1 key={h1.url}>
              <Link to={h1.url} key={h1.url} onClick={linkOnClick}>
                {h1.title}
              </Link>
            </H1>
            {h1.items &&
              h1.items.map((h2: any) => (
                <React.Fragment>
                  <H2 key={h2.url}>
                    <Link to={h2.url} key={h2.url} onClick={linkOnClick}>
                      {h2.title}
                    </Link>
                  </H2>
                  {h2.items &&
                    h2.items.map((h3: any) => (
                      <H3 key={h3.url}>
                        <Link to={h3.url} key={h3.url} onClick={linkOnClick}>
                          {h3.title}
                        </Link>
                      </H3>
                    ))}
                </React.Fragment>
              ))}
          </ul>
        ))}
    </TocWrapper>
  );
};

const TocWrapper = styled.div`
  a {
    color: ${({ theme }) => theme.base.colors.text};
    text-decoration: none;
  }
`;

const H1 = styled.li`
  list-style: none;
`;
const H2 = styled.li`
  list-style: none;
  padding-left: 1em;
`;
const H3 = styled.li`
  list-style: none;
  padding-left: 2em;
`;
