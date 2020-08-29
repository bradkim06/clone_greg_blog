import React from "react";
import { Global, css } from "@emotion/core";
import normalize from "normalize.css";

export const GlobalStyle = () => (
  <Global
    styles={css`
      ${normalize}

      html {
        box-sizing: border-box;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: none;
        -ms-text-size-adjust: 100%;
        font-family: Open Sans;
        line-height: 1.15;
        text-size-adjust: 100%;
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
        background: #fafafa;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.05);
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
        -webkit-box-shadow: 0 0 0 50px white inset;
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
