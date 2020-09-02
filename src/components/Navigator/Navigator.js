import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { forceCheck } from "react-lazyload";

import {
  setNavigatorPosition,
  setNavigatorShape,
  setCategoryFilter,
} from "../../state/store";
import { moveNavigatorAside } from "./../../utils/shared";
import List from "./List";

class Navigator extends React.Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    navigatorPosition: PropTypes.string.isRequired,
    navigatorShape: PropTypes.string.isRequired,
    setNavigatorPosition: PropTypes.func.isRequired,
    setNavigatorShape: PropTypes.func.isRequired,
    isWideScreen: PropTypes.bool.isRequired,
    categoryFilter: PropTypes.string.isRequired,
    setCategoryFilter: PropTypes.func.isRequired,
  };

  linkOnClick = moveNavigatorAside.bind(this);

  expandOnClick = () => {
    this.props.setNavigatorShape("open");
    setTimeout(forceCheck, 600);
  };

  removefilterOnClick = () => {
    this.props.setCategoryFilter("all posts");
  };

  render() {
    const {
      posts,
      navigatorPosition,
      navigatorShape,
      categoryFilter,
    } = this.props;

    return (
      <StyleNavigator
        className={`${navigatorPosition ? navigatorPosition : ""} ${
          navigatorShape ? navigatorShape : ""
        } `}
      >
        {this.props.posts.totalCount && (
          <List
            posts={posts.edges}
            navigatorPosition={navigatorPosition}
            navigatorShape={navigatorShape}
            linkOnClick={this.linkOnClick}
            expandOnClick={this.expandOnClick}
            categoryFilter={categoryFilter}
            removeFilter={this.removefilterOnClick}
          />
        )}
      </StyleNavigator>
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
  setCategoryFilter,
};

const StyleNavigator = styled(`nav`)`
  transform: translate3d(0, 0, 0);
  will-change: left, top, bottom, width;
  background: ${(props) => props.theme.navigator.colors.background};
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  transition-timing-function: ease;
  transition: left 0.9s;
  width: 100%;

  @media (max-width: ${(props) => props.theme.mediaQueryTresholds.L - 1}px) {
    &.is-aside {
      left: -100%;
    }

    &.is-featured {
      left: 0;
    }
  }

  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.L}px) {
    &.is-featured {
      transition: left 0.9s;
      width: calc(
        100vw - ${(props) => props.theme.info.sizes.width}px -
          ${(props) => props.theme.bars.sizes.actionsBar}px
      );
      left: ${(props) => props.theme.info.sizes.width}px;
      top: 0;
    }

    &.is-aside {
      transition: bottom 0.5s;
      left: 0;
      width: ${(props) => props.theme.info.sizes.width - 1}px;
      z-index: 1;
      top: auto;

      &.closed {
        bottom: calc(
          -100% + 100px + ${(props) => props.theme.navigator.sizes.closedHeight}px
        );
        height: calc(100% - 100px);
      }

      &.open {
        bottom: 0;
        height: calc(100% - 100px);
      }

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: ${(props) => props.theme.base.sizes.linesMargin};
        right: ${(props) => props.theme.base.sizes.linesMargin};
        height: 0;
        border-top: 1px solid ${(props) => props.theme.base.colors.lines};
      }
    }

    &.moving-aside {
      transition: left 0.9s;
      left: calc(-100vw + ${(props) => props.theme.info.sizes.width}*2px + 2px);
      width: calc(100vw - ${(props) => props.theme.info.sizes.width}px - 60px);
      top: 0;
    }

    &.resizing-aside {
      transition: none;
      width: ${(props) => props.theme.info.sizes.width}px;
      top: auto;
      left: 0;

      &.closed {
        bottom: calc(-100% + 100px);
        height: calc(100% - 100px);
      }

      &.open {
        bottom: calc(-100% + 100px);
        height: calc(100% - 100px);
      }
    }

    &.moving-featured {
      transition: bottom 0.3s;
      bottom: -100%;
      top: auto;
      left: 0;
      z-index: 1;
      width: ${(props) => props.theme.info.sizes.width - 1}px;
    }

    &.resizing-featured {
      transition: none;
      top: 0;
      bottom: auto;
      left: calc(
        -100vw + ${(props) => props.theme.info.sizes.width}*2px + 60px
      );
      width: calc(100vw - ${(props) => props.theme.info.sizes.width}px - 60px);
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
