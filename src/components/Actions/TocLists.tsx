import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

const TocWrapper = styled.div`
  font-size: 1.4em;

  a {
    text-decoration: none;
  }

  ${props => {
    const { title } = props.theme.main.colors;
    return css`
      h1 {
        font-size: 1.5em;
        text-align: center;
        color: ${title};
      }
    `;
  }}
`;

const H1 = styled.ol`
  li {
    margin: 0.6em 0;
  }
  ${props => {
    const { accent } = props.theme.base.colors;
    return css`
      a {
        font-weight: 600;
        color: ${accent};
      }
    `;
  }}
`;
const H2 = styled.ol`
  padding-left: 1em;
  li {
    margin: 0.3em 0;
  }

  ${props => {
    const { main, minWidth } = props.theme;
    return css`
      a {
        font-weight: 600;
        color: ${main.colors.title};
      }

      @media ${minWidth.M} {
        padding-left: 2em;
      }
    `;
  }}
`;
const H3 = styled.ol`
  padding-left: 1em;
  li {
    margin: 0.1em 0;
  }
  ${props => {
    const { main, minWidth } = props.theme;
    return css`
      a {
        font-weight: 400;
        color: ${main.colors.subTitle};
      }

      @media ${minWidth.M} {
        padding-left: 2em;
      }
    `;
  }}
`;

type TocType = {
  url?: string;
  title?: string;
  items?: Record<string, unknown>;
};

type TocProps = {
  toc: TocType;
  linkOnClick: () => void;
};

function TocLists({ toc, linkOnClick }: TocProps): ReactElement {
  return (
    <TocWrapper>
      <h1>Table of contents</h1>
      <H1 type="I">
        {toc &&
          toc.items &&
          toc.items.map((h1: TocType) => (
            <>
              <Link to={h1.url} key={h1.url} onClick={linkOnClick}>
                <li key={h1.url}>{h1.title}</li>
              </Link>
              <H2>
                {h1.items &&
                  h1.items.map((h2: TocType) => (
                    <>
                      <Link to={h2.url} key={h2.url} onClick={linkOnClick}>
                        <li key={h2.url}>{h2.title}</li>
                      </Link>
                      <H3 type="i">
                        {h2.items &&
                          h2.items.map((h3: TocType) => (
                            <Link
                              to={h3.url}
                              key={h3.url}
                              onClick={linkOnClick}
                            >
                              <li key={h3.url}>{h3.title}</li>
                            </Link>
                          ))}
                      </H3>
                    </>
                  ))}
              </H2>
            </>
          ))}
      </H1>
    </TocWrapper>
  );
}

export default TocLists;
