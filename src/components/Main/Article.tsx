import React from 'react';
import styled, { css } from 'styled-components';

export default ({ children }: { children: React.ReactNode }) => {
  return <PageContent>{children}</PageContent>;
};

const PageContent = styled.article`
  & li {
    margin: 0 0 0.5em 0;
  }

  & p {
    margin: 0 0 1.5em 0;
    font-weight: 400;
  }

  & table {
    display: inline-block;
    overflow-x: auto;
    margin: 0.5em 0 2.5em;
    max-width: 100%;
    width: auto;
    border-spacing: 0;
    border-collapse: collapse;
    white-space: nowrap;
    vertical-align: top;
  }

  ${props => {
    const { main, base, minWidth } = props.theme;
    return css`
      color: ${main.colors.content};
      line-height: ${main.fonts.content.lineHeight};

      & a {
        color: ${base.colors.link};
      }

      & h1,
      & h2,
      & h3 {
        color: ${main.colors.contentHeading};
        font-weight: ${main.fonts.contentHeading.weight};
        line-height: ${main.fonts.contentHeading.lineHeight};
        margin: 2em 0 1em;
        letter-spacing: -0.02em;
      }
      & h3 {
        font-size: ${main.fonts.contentHeading.h3Size}em;
      }
      & ul {
        list-style: circle;
        padding: 0 0 0 1.3em;
        @media ${minWidth.M} {
          padding: 0 0 0 2em;
        }
      }
      & blockquote {
        border: 5px solid ${main.colors.blockquoteFrame};
        font-style: italic;
        margin: 2.5em 0;
        padding: 1em 1.1em 1em 1.3em;
        position: relative;
        & p {
          margin: 0;
        }
        &::before,
        &::after {
          background: ${main.colors.background};
          content: '';
          height: 5px;
          left: 50%;
          margin-left: -47%;
          position: absolute;
          top: -5px;
          width: 94%;
        }
        &::after {
          top: auto;
          bottom: -5px;
        }
      }

      & table th {
        // color: ${base.colors.text};
        font-size: 1.2rem;
        font-weight: 700;
        letter-spacing: 0.2px;
        text-align: left;
        text-transform: uppercase;
        background-color: ${base.colors.lines};
      }

      & table th,
      & table td {
        padding: 6px 12px;
        border: 1px solid ${base.colors.text};
      }
    `;
  }}
`;
