import React, { useEffect, ReactElement } from 'react';
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
import { lightTheme } from '../../styles/lightTheme';
import { darkTheme } from '../../styles/darkTheme';
import GlobalStyle from '../../styles/globals';

import store, { ReduxState, setThemeToggle } from '../../state/store';

type InitializeProps = {
  children: React.ReactNode;
};

const Initialize = ({ children }: InitializeProps): ReactElement => {
  const isThemeState = useSelector<ReduxState, boolean>(
    state => state.themeToggle,
  );
  const dispatch = useDispatch();
  const theme: Record<string, unknown> = isThemeState ? darkTheme : lightTheme;
  const materialTheme = createMuiTheme(theme);

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

type RootProps = {
  element: ReactElement;
};

// eslint-disable-next-line react/display-name,react/prop-types
function wrapRootElement({ element }: RootProps): ReactElement {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts

  return (
    <ReduxProvider store={store}>
      <Initialize>{element}</Initialize>
    </ReduxProvider>
  );
}

export default wrapRootElement;
