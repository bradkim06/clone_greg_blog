import React from "react";
import { Global, css } from "@emotion/core";
import normalize from "normalize.css";
import emotionReset from "emotion-reset";
import theme from "../styles/theme";

const font = theme.base.fonts.unstyledFamily;

export const GlobalStyle = () => (
  <Global
    styles={css`
      ${normalize}
      ${emotionReset}

      html {
        box-sizing: border-box;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: none;
        -ms-text-size-adjust: 100%;
        font-family: ${theme.base.fonts.styledFamily};
        line-height: 1.15;
        text-size-adjust: 100%;
      }

      html.wf-active {
        font-family: ${theme.base.fonts.unstyledFamily};
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

      body {
        margin: 0;
        background: ${(props) => props.theme.base.colors.background};
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.05);
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

      :not(pre) > code[class*="language-"] {
        background: #eee;
        color: #666;
        text-shadow: none;
        padding: 1px 5px;
        border-radius: 2px;
      }
    `}
  />
);
