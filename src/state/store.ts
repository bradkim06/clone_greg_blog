import {
  createStore as reduxCreateStore,
  applyMiddleware,
  StoreCreator,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { FluidObject } from 'gatsby-image';

export type MdxType = {
  id: string;
  body: string;
  excerpt: string;
  tableOfContents?: {
    url?: string;
    title?: string;
    items?: Record<string, unknown>;
  };
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    subTitle?: string;
    date?: string;
    cover?: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
};

export type CurrentPostProps = {
  mdx: MdxType;
};

const initialState = {
  navigatorPosition: 'is-aside',
  navigatorShape: 'open',
  navigatorFilter: '',
  isWideScreen: false,
  scrollToTop: false,
  fontSizeIncrease: 1,
  categoryFilter: 'all posts',
  themeToggle: false,
  currentPost: {},
};

export type ReduxState = {
  navigatorPosition: string;
  navigatorShape: string;
  navigatorFilter: string;
  isWideScreen: boolean;
  scrollToTop: boolean;
  fontSizeIncrease: number;
  categoryFilter: string;
  themeToggle: boolean;
  currentPost: Partial<CurrentPostProps>;
};

// export type ReduxState = typeof initialState;

const SET_NAVIGATOR_POSITION = 'SET_NAVIGATOR_POSITION';
const SET_NAVIGATOR_SHAPE = 'SET_NAVIGATOR_SHAPE';
const SET_NAVIGATOR_FILTER = 'SET_NAVIGATOR_FILTER';
const SET_IS_WIDE_SCREEN = 'SET_IS_WIDE_SCREEN';
const SET_SCROLL_TO_TOP = 'SET_SCROLL_TO_TOP';
const SET_FONT_SIZE_INCREASE = 'SET_FONT_SIZE_INCREASE';
const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER';
const SET_THEME_TOGGLE = 'SET_THEME_TOGGLE';
const SET_CURRENT_POST = 'SET_CURRENT_POST';

/*
 * action types
 */

export type Action =
  | { type: typeof SET_NAVIGATOR_POSITION; payload: string }
  | { type: typeof SET_NAVIGATOR_SHAPE; payload: string }
  | { type: typeof SET_NAVIGATOR_FILTER; payload: string }
  | { type: typeof SET_IS_WIDE_SCREEN; payload: boolean }
  | { type: typeof SET_SCROLL_TO_TOP; payload: boolean }
  | { type: typeof SET_FONT_SIZE_INCREASE; payload: number }
  | { type: typeof SET_CATEGORY_FILTER; payload: string }
  | { type: typeof SET_THEME_TOGGLE }
  | { type: typeof SET_CURRENT_POST; payload: CurrentPostProps };

/*
 * action creators
 */

export function setNavigatorPosition(payload: string): Action {
  return { type: SET_NAVIGATOR_POSITION, payload };
}

export function setNavigatorShape(payload: string): Action {
  return { type: SET_NAVIGATOR_SHAPE, payload };
}

export function setNavigatorFilter(payload: string): Action {
  return { type: SET_NAVIGATOR_FILTER, payload };
}

export function setIsWideScreen(payload: boolean): Action {
  return { type: SET_IS_WIDE_SCREEN, payload };
}

export function setScrollToTop(payload: boolean): Action {
  return { type: SET_SCROLL_TO_TOP, payload };
}

export function setFontSizeIncrease(payload: number): Action {
  return { type: SET_FONT_SIZE_INCREASE, payload };
}

export function setCategoryFilter(payload: string): Action {
  return { type: SET_CATEGORY_FILTER, payload };
}

export function setThemeToggle(): Action {
  return { type: SET_THEME_TOGGLE };
}

export function setCurrentPost(payload: CurrentPostProps): Action {
  return { type: SET_CURRENT_POST, payload };
}

/*
 * reducer
 */
function reducer(state: ReduxState, action: Action): ReduxState {
  switch (action.type) {
    case SET_NAVIGATOR_POSITION:
      return {
        ...state,
        navigatorPosition: action.payload,
      };

    case SET_NAVIGATOR_SHAPE:
      return {
        ...state,
        navigatorShape: action.payload,
      };

    case SET_NAVIGATOR_FILTER:
      return {
        ...state,
        navigatorFilter: action.payload,
      };

    case SET_IS_WIDE_SCREEN:
      return {
        ...state,
        isWideScreen: action.payload,
      };

    case SET_SCROLL_TO_TOP:
      return {
        ...state,
        scrollToTop: action.payload,
      };

    case SET_FONT_SIZE_INCREASE:
      return {
        ...state,
        fontSizeIncrease: action.payload,
      };

    case SET_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: action.payload,
      };

    case SET_THEME_TOGGLE:
      return {
        ...state,
        themeToggle: !state.themeToggle,
      };

    case SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.payload,
      };

    default:
      return state;
  }
}

const createStore = (): StoreCreator =>
  reduxCreateStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware()),
  );
export default createStore;
