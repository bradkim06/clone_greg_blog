import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider as MaterialProvider } from "@material-ui/core/styles";
import { ThemeProvider as EmotionProvider } from "emotion-theming";
import theme from "../../src/styles/theme";
import Navigator from "../../src/components/Navigator/Navigator";
import InfoBar from "../../src/components/InfoBox/InfoBar";
import InfoBox from "../../src/components/InfoBox";
import ActionsBar from "../../src/components/ActionsBar/ActionsBar";
import { GlobalStyle } from "../../src/styles/globals";
import LayoutWrapper from "../../src/components/LayoutWrapper/";
import { connect } from "react-redux";

import { setFontSizeIncrease, setIsWideScreen } from "../../src/state/store";
import { isWideScreen, timeoutThrottlerHandler } from "../../src/utils/helpers";

class TopLayout extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
    setIsWideScreen: PropTypes.func.isRequired,
    isWideScreen: PropTypes.bool.isRequired,
    fontSizeIncrease: PropTypes.number.isRequired,
    setFontSizeIncrease: PropTypes.func.isRequired,
  };

  timeouts = {};
  categories = [];

  componentDidMount() {
    this.props.setIsWideScreen(isWideScreen());
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.resizeThrottler, false);
    }
  }

  componentWillMount() {
    if (typeof localStorage !== "undefined") {
      const inLocal = +localStorage.getItem("font-size-increase");

      const inStore = this.props.fontSizeIncrease;

      if (inLocal && inLocal !== inStore && inLocal >= 1 && inLocal <= 1.5) {
        this.props.setFontSizeIncrease(inLocal);
      }
    }
  }

  resizeThrottler = () => {
    return timeoutThrottlerHandler(
      this.timeouts,
      "resize",
      500,
      this.resizeHandler
    );
  };

  resizeHandler = () => {
    this.props.setIsWideScreen(isWideScreen());
  };

  render() {
    const { navigatorPosition, navigatorShape } = this.props;
    return (
      <React.Fragment>
        <EmotionProvider theme={theme}>
          <MaterialProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <GlobalStyle />
            <LayoutWrapper>
              {navigatorPosition !== "is-featured" && this.props.children}
              <Navigator />
              <ActionsBar />
              <InfoBar />
              <InfoBox />
            </LayoutWrapper>
          </MaterialProvider>
        </EmotionProvider>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pages: state.pages,
    isWideScreen: state.isWideScreen,
    fontSizeIncrease: state.fontSizeIncrease,
    navigatorPosition: state.navigatorPosition,
    navigatorShape: state.navigatorShape,
  };
};

const mapDispatchToProps = {
  setIsWideScreen,
  setFontSizeIncrease,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopLayout);
