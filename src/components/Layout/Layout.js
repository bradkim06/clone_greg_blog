import React from "react";
import PropTypes from "prop-types";

import { GlobalStyle } from "../../styles/globals";
import LayoutWrapper from "../LayoutWrapper/";

class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <LayoutWrapper>{this.props.children}</LayoutWrapper>
      </React.Fragment>
    );
  }
}

export default Layout;
