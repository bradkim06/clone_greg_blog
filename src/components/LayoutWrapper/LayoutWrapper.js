import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";
import theme from "../../styles/theme";

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

function LayoutWrapper(props) {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>{props.children}</Wrapper>
    </ThemeProvider>
  );
}

LayoutWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node
};

export default LayoutWrapper;
