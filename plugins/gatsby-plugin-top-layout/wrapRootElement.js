import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider as MaterialProvider } from "@material-ui/core/styles";
import { ThemeProvider as EmotionProvider } from "emotion-theming";
import theme from "../../src/styles/theme";
import { GlobalStyle } from "../../src/styles/globals";

import createStore from "../../src/state/store";

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = createStore();
  return (
    <ReduxProvider store={store}>
      <EmotionProvider theme={theme}>
        <MaterialProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <GlobalStyle />
          {element}
        </MaterialProvider>
      </EmotionProvider>
    </ReduxProvider>
  );
};
