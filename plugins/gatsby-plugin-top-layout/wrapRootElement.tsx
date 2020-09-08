import React, { useEffect, useState } from "react";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { ThemeProvider as MaterialProvider } from "@material-ui/core/styles";
import { ThemeProvider as EmotionProvider } from "emotion-theming";
import { ThemeProvider as StyledProvider } from "styled-components";
import { lightTheme } from "../../src/styles/lightTheme";
import { darkTheme } from "../../src/styles/darkTheme";
import { GlobalStyle } from "../../src/styles/globals";
import { createMuiTheme } from "@material-ui/core/styles";

import createStore from "../../src/state/store";

const store = createStore();

// eslint-disable-next-line react/display-name,react/prop-types
function wrapRootElement({ element }: any) {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts

  return (
    <ReduxProvider store={store}>
      <Initialize>{element}</Initialize>
    </ReduxProvider>
  );
}

const Initialize = ({ children }: any) => {
  const stateTheme = useSelector(state => state.themeToggle);
  const theme = stateTheme ? darkTheme : lightTheme;
  const materialTheme = createMuiTheme(theme);

  return (
    <StyledProvider theme={theme}>
      <EmotionProvider theme={theme}>
        <MaterialProvider theme={materialTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <GlobalStyle />
          {children}
        </MaterialProvider>
      </EmotionProvider>
    </StyledProvider>
  );
};

export default wrapRootElement;
