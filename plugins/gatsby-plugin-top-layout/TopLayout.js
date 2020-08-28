import React from "react";
import { Helmet } from "react-helmet";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider as MaterialProvider } from "@material-ui/core/styles";
import { ThemeProvider as EmotionProvider } from "emotion-theming";
import theme from "../../src/styles/theme";
import InfoBox from "../../src/components/InfoBox/InfoBox";
import InfoBar from "../../src/components/InfoBox/InfoBar";
import ActionsBar from "../../src/components/ActionsBar/ActionsBar";
import { GlobalStyle } from "../../src/styles/globals";
import LayoutWrapper from "../../src/components/LayoutWrapper/";

export default function TopLayout(props) {
  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <MaterialProvider theme={theme}>
        <EmotionProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <GlobalStyle />
          <LayoutWrapper>
            {props.children}
            <ActionsBar />
            <InfoBar />
            <InfoBox />
          </LayoutWrapper>
        </EmotionProvider>
      </MaterialProvider>
    </React.Fragment>
  );
}
