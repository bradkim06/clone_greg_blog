import React from "react";
import styled from "@emotion/styled";
import SpringScrollbars from "../SpringScrollbars";

function Main({ children }) {
  return (
    <StyleMain>
      <SpringScrollbars>{children}</SpringScrollbars>
    </StyleMain>
  );
}

const StyleMain = styled.main`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  animation-name: main-entry;
  animation-duration: 0.5s;
  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.L}px) {
    width: calc(
      100vw - ${(props) => props.theme.info.sizes.width}px -
        ${(props) => props.theme.bars.sizes.actionsBar}px
    );
    left: ${(props) => props.theme.info.sizes.width}px;
  }

  @media print {
    position: relative;

    & > div {
      overflow: visible !important;
    }

    & > div > div {
      position: relative !important;
    }
  }
`;

export default Main;
