import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { SpringSystem, util, Spring } from 'rebound';
import { forceCheck } from 'react-lazyload';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';

import { setScrollToTop, ReduxState, Action } from '../../state/store';

const Focus = styled.div`
  &:focus {
    outline: none;
  }
`;

type ScrollType = {
  forceCheckOnScroll: boolean;
  isNavigator: boolean;
  navigatorPosition: string;
  scrollToTop: boolean;
  setScrollToTop: (payload: boolean) => Action;
  theme: {
    bars: {
      colors: {
        icon: string;
      };
    };
  };
};

type ScrollbarsType = {
  getScrollTop: () => number;
  getScrollHeight: () => number;
  getHeight: () => number;
  scrollTop: (top: number) => void;
};

class SpringScrollbars extends Component<ScrollType> {
  springSystem!: SpringSystem;

  spring!: Spring;

  scrollbars!: ScrollbarsType;

  constructor(props: never) {
    super(props);
    this.handleSpringUpdate = this.handleSpringUpdate.bind(this);
    this.renderThumb = this.renderThumb.bind(this);
  }

  componentDidMount() {
    this.springSystem = new SpringSystem();
    this.spring = this.springSystem.createSpring();
    this.spring.addListener({ onSpringUpdate: this.handleSpringUpdate });
  }

  componentDidUpdate(prevProps: ScrollType) {
    const {
      isNavigator,
      navigatorPosition,
      scrollToTop,
      setScrollToTop,
    } = this.props;
    if (isNavigator && navigatorPosition !== 'is-featured') {
      return;
    }

    if (scrollToTop && scrollToTop !== prevProps.scrollToTop) {
      this.scrollTop(0);
      setScrollToTop(false);
    }
  }

  componentWillUnmount() {
    this.springSystem.deregisterSpring(this.spring);
    this.springSystem.removeAllListeners();
    // this.springSystem = undefined;
    this.spring.destroy();
    // this.spring = undefined;
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
      scrollHeight * 0.99,
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

  renderThumb({ style, ...props }) {
    const { theme } = this.props;
    const thumbStyle = {
      backgroundColor: theme.bars.colors.icon,
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  render() {
    const { children, forceCheckOnScroll } = this.props;

    return (
      <Scrollbars
        autoHide
        universal
        onScroll={forceCheckOnScroll && forceCheck}
        ref={comp => {
          this.scrollbars = comp;
        }}
        renderThumbHorizontal={this.renderThumb}
        renderThumbVertical={this.renderThumb}
        onUpdate={this.handleUpdate}
      >
        <Focus tabIndex={0}>{children}</Focus>
      </Scrollbars>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    scrollToTop: state.scrollToTop,
    navigatorPosition: state.navigatorPosition,
  };
};

const mapDispatchToProps = {
  setScrollToTop,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(SpringScrollbars));
