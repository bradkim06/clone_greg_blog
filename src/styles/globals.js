import React from "react";
import { createGlobalStyle, css } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    font-family: inherit;
  }


  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }


  noscript {
    background: #d00;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1000;
    transform: translate(-50%, -50%);
    padding: 1.5rem 2.5rem;
    font-weight: 400;
    border-radius: 2px;
    box-shadow: 0 0 10px 52px rgba(255, 255, 255, 0.8);
  }

  wrapper: {
  }
  main {
    position: relative;
  }

  h1,
  h2,
  h3 {
    font-weight: 300;
  }

  a {
    background: transparent;
    text-decoration-skip: object;
    font-weight: bold;
    text-decoration: none;
    transition: 0.3s;
  }

  input:-webkit-autofill {
    box-shadow: 0 0 0 50px white inset;
  }

  .gatsby-highlight {
    position: relative;

    .token {
      font-style: normal !important;
    }
  }

  pre[class*='language-']::before {
    background: #d9d7e0;
    border-radius: 0 0 4px 4px;
    color: #232129;
    font-size: 0.75em;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas,
      'Liberation Mono', 'Courier New', monospace;
    letter-spacing: 0.075em;
    line-height: 1;
    padding: 0.25rem 0.5rem;
    position: absolute;
    left: 1rem;
    text-align: right;
    text-transform: uppercase;
    top: 0;
  }

  pre[class*='language-'] code {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas,
      'Liberation Mono', 'Courier New', monospace;
    font-variant: no-common-ligatures no-discretionary-ligatures
      no-historical-ligatures no-contextual;
  }

  pre[class~='language-js']::before,
  pre[class~='language-javascript']::before {
    content: 'js';
    background: #f7df1e;
  }

  pre[class~='language-jsx']::before {
    content: 'jsx';
    background: #61dafb;
  }

  pre[class~='language-typescript']::before,
  pre[class~='language-ts']::before {
    content: 'ts';
    background: #294e80;
    color: #fff;
  }

  pre[class~='language-tsx']::before {
    content: 'tsx';
    background: #294e80;
    color: #fff;
  }

  pre[class~='language-graphql']::before {
    content: 'GraphQL';
    background: #e10098;
    color: #fff;
  }

  pre[class~='language-html']::before {
    content: 'html';
    background: #005a9c;
    color: #fff;
  }

  pre[class~='language-css']::before {
    content: 'css';
    background: #ff9800;
    color: #fff;
  }

  pre[class~='language-mdx']::before {
    content: 'mdx';
    background: #f9ac00;
    color: #fff;
  }

  pre[class~='language-shell']::before {
    content: 'shell';
  }

  pre[class~='language-sh']::before {
    content: 'sh';
  }

  pre[class~='language-bash']::before {
    content: 'bash';
  }

  pre[class~='language-yaml']::before {
    content: 'yaml';
    background: #ffa8df;
  }

  pre[class~='language-markdown']::before {
    content: 'md';
  }

  pre[class~='language-json']::before,
  pre[class~='language-json5']::before {
    content: 'json';
    background: linen;
  }

  pre[class~='language-diff']::before {
    content: 'diff';
    background: #e6ffed;
  }

  pre[class~='language-text']::before {
    content: 'text';
    background: #fff;
  }

  pre[class~='language-flow']::before {
    content: 'flow';
    background: #e8bd36;
  }

  .highlight-line {
    background-color: rgb(63, 69, 79);
    margin-left: -1rem;
    padding-left: 0.5rem;
    border-left: 0.5rem solid ${({ theme }) => theme.base.colors.accent};
  }

  ${props => {
    const { base, main } = props.theme;
    return css`
      html {
        box-sizing: border-box;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: none;
        -ms-text-size-adjust: 100%;
        font-family: ${base.fonts.styledFamily};
        line-height: 1.5;
        text-size-adjust: 100%;
      }

      body {
        margin: 0;
        background: ${base.colors.background};
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.05);
      }

      // html.wf-active {
      //   font-family: ${base.fonts.unstyledFamily};
      // }

      :not(pre) > code[class*="inline-code"] {
        background-color: ${base.colors.accent};
        color: ${base.colors.brightText};
        text-shadow: none;
        padding: 1px 5px;
        border-radius: 2px;
      }

      strong {
        color: ${main.colors.contentHeading};
      }

      ::selection {
        background-color: ${base.colors.accent};
        color: ${base.colors.brightText};
      }
    `;
  }}
`;
