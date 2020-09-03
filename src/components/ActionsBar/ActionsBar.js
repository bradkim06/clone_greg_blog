import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import IconButton from "@material-ui/core/IconButton";

import Link from "gatsby-link";
import { connect } from "react-redux";
import screenfull from "screenfull";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
// import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";

import theme from "../../styles/theme";

import {
  setNavigatorPosition,
  setNavigatorShape,
  setScrollToTop,
  setFontSizeIncrease,
  setCategoryFilter,
} from "../../state/store";
import { featureNavigator, moveNavigatorAside } from "../../utils/shared";
import FontSetter from "./FontSetter";
import CategoryFilter from "./CategoryFilter";

class ActionsBar extends React.Component {
  static propTypes = {
    navigatorPosition: PropTypes.string.isRequired,
    navigatorShape: PropTypes.string.isRequired,
    isWideScreen: PropTypes.bool.isRequired,
    setScrollToTop: PropTypes.func.isRequired,
    setFontSizeIncrease: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    setCategoryFilter: PropTypes.func.isRequired,
    categoryFilter: PropTypes.string.isRequired,
  };

  state = {
    fullscreen: false,
  };

  componentDidMount() {
    if (screenfull.isEnabled) {
      screenfull.on("change", () => {
        this.setState({
          fullscreen: screenfull.isFullscreen,
        });
      });
    }
  }

  homeOnClick = featureNavigator.bind(this);
  searchOnClick = moveNavigatorAside.bind(this);

  fullscreenOnClick = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  arrowUpOnClick = () => {
    this.props.setScrollToTop(true);
  };

  fontSetterOnClick = (val) => {
    this.props.setFontSizeIncrease(val);
  };

  categoryFilterOnClick = (val) => {
    this.props.setCategoryFilter(val);
  };

  render() {
    const {
      navigatorPosition,
      navigatorShape,
      isWideScreen,
      categories,
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
          {((isWideScreen && navigatorShape === "open") ||
            navigatorPosition !== "is-aside") && (
            <CategoryFilter
              categories={categories}
              filterCategory={this.categoryFilterOnClick}
            />
          )}
          <IconButton
            aria-label="Search"
            onClick={this.searchOnClick}
            component={Link}
            data-shape="closed"
            to="/search/"
            title="Search"
            className="iconButton"
          >
            <SearchIcon />
          </IconButton>
        </Group>
        <Group>
          {navigatorPosition === "is-aside" && (
            <FontSetter increaseFont={this.fontSetterOnClick} />
          )}
          <IconButton
            aria-label="Fullscreen"
            onClick={this.fullscreenOnClick}
            title="Fullscreen mode"
            className="iconButton"
          >
            <FullscreenIcon />
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

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
    navigatorShape: state.navigatorShape,
    isWideScreen: state.isWideScreen,
    categoryFilter: state.categoryFilter,
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape,
  setScrollToTop,
  setFontSizeIncrease,
  setCategoryFilter,
};

const StyleActionsBar = styled.div`
  position: absolute;
  background: ${(props) => props.theme.bars.colors.background};
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  padding: 0 ${(props) => props.theme.bars.sizes.actionsBar}px;
  justify-content: space-between;
  height: ${(props) => props.theme.bars.sizes.actionsBar}px;
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    left: ${(props) => props.theme.base.sizes.linesMargin};
    right: ${(props) => props.theme.base.sizes.linesMargin};
    height: 0;
    top: 0;
    border-top: 1px solid ${(props) => props.theme.base.colors.lines};
  }

  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.M}px) {
    padding: 0 calc(${(props) => props.theme.base.sizes.linesMargin} * 1.5);
  }

  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.L}px) {
    flex-direction: column;
    top: 0;
    right: 0;
    left: auto;
    height: 100%;
    padding: ${(props) => props.theme.base.sizes.linesMargin} 0;
    width: ${(props) => props.theme.bars.sizes.actionsBar}px;

    &::before {
      top: ${(props) => props.theme.base.sizes.linesMargin};
      bottom: ${(props) => props.theme.base.sizes.linesMargin};
      left: 0;
      right: auto;
      width: 0;
      height: auto;
      border-left: 1px solid ${(props) => props.theme.base.colors.lines};
    }
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.L}px) {
    flex-direction: column;
  }

  .iconButton {
    color: ${theme.bars.colors.icon};
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(ActionsBar);
