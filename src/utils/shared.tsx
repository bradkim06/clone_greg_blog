import { forceCheck } from "react-lazyload";
import { navigate } from "@reach/router";
import { useSelector, shallowEqual } from "react-redux";
import {
  setNavigatorShape,
  setNavigatorPosition,
  ReduxState
} from "../state/store";

export function moveNavFeature(
  e: any,
  state: moveNavAsideState,
  dispatch: any
): void {
  e && e.preventDefault();
  // uncomment following lines if you want to count featuring Navigator as a visit
  // to index page ('/'), you have to also uncomment import { navigateTo }...
  navigate("/");

  if (state.navigatorPosition === "is-aside") {
    if (state.isWideScreen) {
      dispatch(setNavigatorPosition("moving-featured"));

      setTimeout(() => {
        dispatch(setNavigatorPosition("resizing-featured"));
        setTimeout(() => {
          dispatch(setNavigatorPosition("is-featured"));
        });
      }, 300);
      dispatch(setNavigatorShape("open"));
    } else {
      setTimeout(() => {
        dispatch(setNavigatorPosition("is-featured"));
      }, 0);
    }
  }
}

export type moveNavAsideState = {
  navigatorPosition: string;
  navigatorShape: string;
  isWideScreen: boolean;
};

export function moveNavAside(state: moveNavAsideState, dispatch: any): void {
  if (state.navigatorPosition === "is-featured") {
    if (state.isWideScreen) {
      dispatch(setNavigatorPosition("moving-aside"));

      setTimeout(() => {
        dispatch(setNavigatorPosition("resizing-aside"));
        setTimeout(() => {
          dispatch(setNavigatorPosition("is-aside"));
          setTimeout(forceCheck, 600);
        });
      }, 800);
    } else {
      setTimeout(() => {
        dispatch(setNavigatorPosition("is-aside"));
      }, 100);
    }
  }

  return;
}

export function moveNavData() {
  return useSelector<ReduxState, moveNavAsideState>(
    state => ({
      navigatorShape: state.navigatorShape,
      navigatorPosition: state.navigatorPosition,
      isWideScreen: state.isWideScreen
    }),
    shallowEqual
  );
}
