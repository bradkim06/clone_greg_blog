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
      <h1>Table of contents</h1>
      <H1 type="I">
        {toc &&
          toc.items &&
          toc.items.map((h1: any) => (
            <React.Fragment>
              <Link to={h1.url} key={h1.url} onClick={linkOnClick}>
                <li key={h1.url}>{h1.title}</li>
              </Link>
              <H2>
                {h1.items &&
                  h1.items.map((h2: any) => (
                    <React.Fragment>
                      <Link to={h2.url} key={h2.url} onClick={linkOnClick}>
                        <li key={h2.url}>{h2.title}</li>
                      </Link>
                      <H3 type="i">
                        {h2.items &&
                          h2.items.map((h3: any) => (
                            <Link
                              to={h3.url}
                              key={h3.url}
                              onClick={linkOnClick}
                            >
                              <li key={h3.url}>{h3.title}</li>
                            </Link>
                          ))}
                      </H3>
                    </React.Fragment>
                  ))}
              </H2>
            </React.Fragment>
          ))}
      </H1>
    </TocWrapper>
  );
};

const TocWrapper = styled.div`
  a {
    text-decoration: none;
  }

  h1 {
    font-size: 1.5em;
    text-align: center;
    color: ${({ theme }) => theme.main.colors.title};
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    font-size: 1.4em;
  }
`;

const H1 = styled.ol`
  li {
    margin: 0.6em 0;
  }
  a {
    font-weight: 600;
    color: ${({ theme }) => theme.base.colors.accent};
  }
`;
const H2 = styled.ol`
  padding-left: 1em;
  li {
    margin: 0.3em 0;
  }
  a {
    font-weight: 600;
    color: ${({ theme }) => theme.main.colors.title};
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    padding-left: 2em;
  }
`;
const H3 = styled.ol`
  padding-left: 1em;
  li {
    margin: 0.1em 0;
  }
  a {
    font-weight: 400;
    color: ${({ theme }) => theme.main.colors.subTitle};
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    padding-left: 2em;
  }
`;
