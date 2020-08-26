import React from "react";
import IconButton from "@material-ui/core/IconButton";
import styled from "@emotion/styled";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";

import Link from "gatsby-link";

const unit = "4px";

const StyleActionsBar = styled.div`
  position: absolute;
  background: ${props => props.theme.bars.colors.background};
  left: 0;
  bottom: 0;
  display: flex;
  padding: 0 ${props => props.theme.bars.sizes.actionsBar}px;
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    left: ${props => props.theme.base.sizes.linesMargin};
    right: ${props => props.theme.base.sizes.linesMargin};
    height: 0;
    top: 0;
    border-top: 1px solid ${props => props.theme.base.colors.lines};
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    padding: 0 calc(${props => props.theme.base.sizes.linesMargin} * 1.5);
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    flex-direction: column;
    top: 0;
    right: 0;
    left: auto;
    height: 100%;
    padding: ${props => props.theme.base.sizes.linesMargin} 0;
    width: ${props => props.theme.bars.sizes.actionsBar}px;

    &::before {
      top: ${props => props.theme.base.sizes.linesMargin};
      bottom: ${props => props.theme.base.sizes.linesMargin};
      left: 0;
      right: auto;
      width: 0;
      height: auto;
      border-left: 1px solid ${props => props.theme.base.colors.lines};
    }
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    flex-direction: column;
  }
`;

export default class ActionsBar extends React.Component {
  render() {
    return (
      <StyleActionsBar>
        <Group>
          <IconButton
            aria-label="Back to list"
            onClick={this.homeOnClick}
            title="Back to the list"
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            aria-label="Search"
            onClick={this.searchOnClick}
            component={Link}
            data-shape="closed"
            to="/search/"
            title="Search"
          >
            <SearchIcon />
          </IconButton>
        </Group>
      </StyleActionsBar>
    );
  }
}
