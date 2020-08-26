import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import styled from "@emotion/styled";

import Link from "gatsby-link";

const StyleActionsBar = styled.div`
  position: absolute;
  background: ${props => props.theme.bars.colors.background};
  left: 0;
  bottom: 0;
  display: flex;
  padding: 0 ${props => props.theme.bars.sizes.actionsBar}px;
  width: 100%;

  &::before {
    content: "hello actionsbar before!";
    position: absolute;
    left: ${props => props.theme.base.sizes.linesMargin};
    right: ${props => props.theme.base.sizes.linesMargin};
    height: 0;
    top: 0;
    border-top: 1px solid ${props => props.theme.base.colors.lines}; 
  }
`;

export default class ActionsBar extends React.Component {
  render() {
    return <StyleActionsBar>Hello ActionsBar!</StyleActionsBar>;
  }
}
