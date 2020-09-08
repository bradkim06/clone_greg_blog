import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Search from "./Search";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness2 from "@material-ui/icons/Brightness2";

import {
  setNavigatorPosition,
  setNavigatorShape,
  setScrollToTop,
  setFontSizeIncrease,
  setCategoryFilter,
  setThemeToggle,
  ReduxState
} from "../../state/store";
import { featureNavigator } from "../../utils/shared";
import FontSetter from "./FontSetter";
import CategoryFilter from "./CategoryFilter";

interface ActionsBarProps {
  navigatorPosition: string;
  navigatorShape: string;
  isWideScreen: boolean;
  categories: string[];
  themeToggle: boolean;
  setScrollToTop: (val: boolean) => void;
  setFontSizeIncrease: (val: number) => void;
  setCategoryFilter: (val: string) => void;
  setThemeToggle: () => void;
}

class ActionsBar extends React.Component<ActionsBarProps> {
  state = {
    fullscreen: false
  };

  homeOnClick = featureNavigator.bind(this);

  arrowUpOnClick = () => {
    this.props.setScrollToTop(true);
  };

  fontSetterOnClick = (val: number) => {
    this.props.setFontSizeIncrease(val);
  };

  categoryFilterOnClick = (val: string) => {
    this.props.setCategoryFilter(val);
  };

  themeToggleClick = () => {
    this.props.setThemeToggle();
  };

  render() {
    const {
      navigatorPosition,
      navigatorShape,
      isWideScreen,
      categories
    } = this.props;

    return (
      <StyleActionsBar>
        <Group>
          <IconButton
            aria-label="Back to list"
            onClick={this.homeOnClick}
            title="Back to the list"
            className="iconButton"
          >
            <HomeIcon />
          </IconButton>
          <Search />
          {((isWideScreen && navigatorShape === "open") ||
            navigatorPosition !== "is-aside") && (
            <CategoryFilter
              categories={categories}
              filterCategory={this.categoryFilterOnClick}
            />
          )}
        </Group>
        <Group>
          {navigatorPosition === "is-aside" && (
            <FontSetter increaseFont={this.fontSetterOnClick} />
          )}
          <IconButton
            aria-label="Theme Toggle"
            onClick={this.themeToggleClick}
            title="Theme Change"
            className="iconButton"
          >
            {this.props.themeToggle ? <WbSunnyIcon /> : <Brightness2 />}
          </IconButton>
          <IconButton
            aria-label="Back to top"
            onClick={this.arrowUpOnClick}
            title="Scroll to top"
            className="iconButton"
          >
            <ArrowUpwardIcon />
          </IconButton>
        </Group>
      </StyleActionsBar>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    navigatorPosition: state.navigatorPosition,
    navigatorShape: state.navigatorShape,
    isWideScreen: state.isWideScreen,
    categoryFilter: state.categoryFilter,
    themeToggle: state.themeToggle
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape,
  setScrollToTop,
  setFontSizeIncrease,
  setCategoryFilter,
  setThemeToggle
};

const StyleActionsBar = styled.div`
  position: absolute;
  background: ${props => props.theme.bars.colors.background};
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  padding: 0 ${props => props.theme.bars.sizes.actionsBar}px;
  justify-content: space-between;
  height: ${props => props.theme.bars.sizes.actionsBar}px;
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

  .iconButton {
    color: ${props => props.theme.bars.colors.icon};
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(ActionsBar);
