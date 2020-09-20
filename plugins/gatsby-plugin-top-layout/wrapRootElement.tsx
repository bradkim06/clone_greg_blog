import React, { useEffect } from 'react';
import {
  Provider as ReduxProvider,
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  ThemeProvider as MaterialProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { lightTheme } from '../../src/styles/lightTheme';
import { darkTheme } from '../../src/styles/darkTheme';
import GlobalStyle from '../../src/styles/globals';

import createStore, { ReduxState, setThemeToggle } from '../../src/state/store';

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

const Initialize = ({ children }: { children: React.ReactNode }) => {
  const isThemeState = useSelector<ReduxState, boolean>(
    state => state.themeToggle,
  );
  const dispatch = useDispatch();
  const theme = isThemeState ? darkTheme : lightTheme;
  const materialTheme = (createMuiTheme as any)(theme);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'darkTheme') {
      dispatch(setThemeToggle());
    }
  }, []);

  return (
    <StyledProvider theme={theme}>
      <MaterialProvider theme={materialTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <GlobalStyle />
        {children}
      </MaterialProvider>
    </StyledProvider>
  );
};

export default wrapRootElement;
