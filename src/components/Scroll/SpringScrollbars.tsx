import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { SpringSystem, util, Spring } from "rebound";
import { forceCheck } from "react-lazyload";
import { connect } from "react-redux";
import styled, { withTheme } from "styled-components";

import { setScrollToTop, ReduxState } from "../../state/store";

type ScrollType = {
  forceCheckOnScroll: any;
  isNavigator: boolean;
  navigatorPosition: string;
  scrollToTop: boolean;
  setScrollToTop: Function;
  theme: {
    bars: {
      colors: {
        icon: number;
      };
    };
  };
};

type scrollbarsType = {
  getScrollTop: () => number;
  getScrollHeight: () => number;
  getHeight: () => number;
  scrollTop: (top: number) => void;
};

class SpringScrollbars extends Component<ScrollType> {
  constructor(props: never) {
    super(props);
    this.handleSpringUpdate = this.handleSpringUpdate.bind(this);
    this.renderThumb = this.renderThumb.bind(this);
  }
  springSystem!: SpringSystem;
  spring!: Spring;
  scrollbars!: scrollbarsType;

  componentDidUpdate(prevProps: any) {
    if (
      this.props.isNavigator &&
      this.props.navigatorPosition !== "is-featured"
    ) {
      return;
    }

    if (
      this.props.scrollToTop &&
      this.props.scrollToTop !== prevProps.scrollToTop
    ) {
      this.scrollTop(0);
      this.props.setScrollToTop(false);
    }
  }
  componentDidMount() {
    this.springSystem = new SpringSystem();
    this.spring = this.springSystem.createSpring();
    this.spring.addListener({ onSpringUpdate: this.handleSpringUpdate });
  }

  componentWillUnmount() {
    this.springSystem.deregisterSpring(this.spring);
    this.springSystem.removeAllListeners();
    this.springSystem = undefined!;
    this.spring.destroy();
    this.spring = undefined!;
  }

  getScrollTop() {
    return this.scrollbars.getScrollTop();
  }

  getScrollHeight() {
    return this.scrollbars.getScrollHeight();
  }

  getHeight() {
    return this.scrollbars.getHeight();
  }

  scrollTop(top: number) {
    const scrollTop = this.scrollbars.getScrollTop();
    const scrollHeight = this.scrollbars.getScrollHeight();
    const val = util.mapValueInRange(
      top,
      0,
      scrollHeight,
      scrollHeight * 0.01,
      scrollHeight * 0.99
    );
    this.spring.setCurrentValue(scrollTop).setAtRest();
    this.spring.setEndValue(val);
  }

  handleSpringUpdate(spring: Spring) {
    window.requestAnimationFrame(() => {
      const val = spring.getCurrentValue();
      this.scrollbars.scrollTop(val);
    });
  }

  renderThumb({ style, ...props }: any) {
    const thumbStyle = {
      backgroundColor: this.props.theme.bars.colors.icon
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  render() {
    const { children, forceCheckOnScroll } = this.props;

    return (
      <Scrollbars
        autoHide
        universal={true}
        onScroll={forceCheckOnScroll && forceCheck}
        ref={comp => {
          (this as any).scrollbars = comp;
        }}
        renderThumbHorizontal={this.renderThumb}
        renderThumbVertical={this.renderThumb}
        onUpdate={(this as any).handleUpdate}
      >
        <Focus tabIndex="0">{children}</Focus>
      </Scrollbars>
    );
  }
}

const Focus = styled.div`
  &:focus {
    outline: none;
  }
`;

const mapStateToProps = (state: ReduxState) => {
  return {
    scrollToTop: state.scrollToTop,
    navigatorPosition: state.navigatorPosition
  };
};

const mapDispatchToProps = {
  setScrollToTop
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(SpringScrollbars as any));
