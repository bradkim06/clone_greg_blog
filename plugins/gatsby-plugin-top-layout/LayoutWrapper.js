import React from "react";
import styled from "styled-components";

export default function LayoutWrapper(props) {
  return <Wrapper>{props.children}</Wrapper>;
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bars.colors.background};
  padding: 1px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  @media print {
    position: relative;
    overflow: visible;
  }
`;
