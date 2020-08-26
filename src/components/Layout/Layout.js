import React from "react";
import PropTypes from "prop-types";

import globals from "../../styles/globals";
import LayoutWrapper from "../LayoutWrapper/";

class Layout extends React.Component {
  render() {
    return (
      <LayoutWrapper>
        <h1>Hello Layout!</h1>
        {this.props.children}
      </LayoutWrapper>
    );
  }
}

export default Layout;
