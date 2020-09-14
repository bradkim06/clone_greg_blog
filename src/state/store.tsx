import { createStore as reduxCreateStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { PostTemplateProps, MdxType } from "../templates/PostTemplate";

/*
 * action types
 */

const SET_NAVIGATOR_POSITION = "SET_NAVIGATOR_POSITION";
const SET_NAVIGATOR_SHAPE = "SET_NAVIGATOR_SHAPE";
const SET_NAVIGATOR_FILTER = "SET_NAVIGATOR_FILTER";
const SET_IS_WIDE_SCREEN = "SET_IS_WIDE_SCREEN";
const SET_SCROLL_TO_TOP = "SET_SCROLL_TO_TOP";
const SET_FONT_SIZE_INCREASE = "SET_FONT_SIZE_INCREASE";
const SET_CATEGORY_FILTER = "SET_CATEGORY_FILTER";
const SET_THEME_TOGGLE = "SET_THEME_TOGGLE";
const SET_CURRENT_POST = "SET_CURRENT_POST";

/*
 * action creators
 */

export function setNavigatorPosition(val: string) {
  return { type: SET_NAVIGATOR_POSITION, val };
}

export function setNavigatorShape(val: string) {
  return { type: SET_NAVIGATOR_SHAPE, val };
}

export function setNavigatorFilter(val: string) {
  return { type: SET_NAVIGATOR_FILTER, val };
}

export function setIsWideScreen(val: boolean) {
  return { type: SET_IS_WIDE_SCREEN, val };
}

export function setScrollToTop(val: boolean) {
  return { type: SET_SCROLL_TO_TOP, val };
}

export function setFontSizeIncrease(val: number) {
  return { type: SET_FONT_SIZE_INCREASE, val };
}

export function setCategoryFilter(val: string) {
  return { type: SET_CATEGORY_FILTER, val };
}

export function setThemeToggle() {
  return { type: SET_THEME_TOGGLE };
}

export function setCurrentPost(val: PostTemplateProps) {
  return { type: SET_CURRENT_POST, val };
}

/*
 * reducer
 */
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_NAVIGATOR_POSITION:
      return {
        ...state,
        navigatorPosition: action.val
      };

    case SET_NAVIGATOR_SHAPE:
      return {
        ...state,
        navigatorShape: action.val
      };

    case SET_NAVIGATOR_FILTER:
      return {
        ...state,
        navigatorFilter: action.val
      };

    case SET_IS_WIDE_SCREEN:
      return {
        ...state,
        isWideScreen: action.val
      };

    case SET_SCROLL_TO_TOP:
      return {
        ...state,
        scrollToTop: action.val
      };

    case SET_FONT_SIZE_INCREASE:
      return {
        ...state,
        fontSizeIncrease: action.val
      };

    case SET_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: action.val
      };

    case SET_THEME_TOGGLE:
      return {
        ...state,
        themeToggle: !state.themeToggle
      };

    case SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.val
      };

    default:
      return state;
  }
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
  currentPost: PostTemplateProps;
};

const initialState: ReduxState = {
  navigatorPosition: "is-aside",
  navigatorShape: "open",
  navigatorFilter: "",
  isWideScreen: false,
  scrollToTop: false,
  fontSizeIncrease: 1,
  categoryFilter: "all posts",
  themeToggle: false,
  currentPost: null
};

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  );
export default createStore;
