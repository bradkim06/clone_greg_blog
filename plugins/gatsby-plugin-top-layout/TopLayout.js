import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
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

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Helmet>
        <MaterialProvider theme={theme}>
          <EmotionProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <GlobalStyle />
            <LayoutWrapper>
              {this.props.children}
              <Navigator />
              <ActionsBar />
              <InfoBar />
              <InfoBox />
            </LayoutWrapper>
          </EmotionProvider>
        </MaterialProvider>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pages: state.pages,
    isWideScreen: state.isWideScreen,
    fontSizeIncrease: state.fontSizeIncrease,
  };
};

const mapDispatchToProps = {
  setIsWideScreen,
  setFontSizeIncrease,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopLayout);
