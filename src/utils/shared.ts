import { Dispatch } from 'react';
import { navigate } from '@reach/router';
import { useSelector, shallowEqual } from 'react-redux';
import {
  setNavigatorShape,
  setNavigatorPosition,
  ReduxState,
  Action,
} from '../state/store';

export function moveNavFeature(
  e: React.MouseEvent,
  state: MoveNavAsideState,
  dispatch: Dispatch<Action>,
): void {
  e.preventDefault();

  if (state.navigatorPosition === 'is-aside') {
    if (state.isWideScreen) {
      dispatch(setNavigatorPosition('moving-featured'));

      setTimeout(() => {
        dispatch(setNavigatorPosition('resizing-featured'));
        dispatch(setNavigatorPosition('is-featured'));
        dispatch(setNavigatorShape('open'));
      }, 500);
    } else {
      setTimeout(() => {
        dispatch(setNavigatorPosition('is-featured'));
      }, 0);
    }
  }
  setTimeout(() => {
    navigate('/');
  }, 500);
}

export type MoveNavAsideState = {
  navigatorPosition: string;
  navigatorShape: string;
  isWideScreen: boolean;
};

export function moveNavAside(
  state: MoveNavAsideState,
  dispatch: Dispatch<Action>,
): void {
  if (state.navigatorPosition === 'is-featured') {
    if (state.isWideScreen) {
      dispatch(setNavigatorPosition('moving-aside'));

      setTimeout(() => {
        dispatch(setNavigatorPosition('resizing-aside'));
        setTimeout(() => {
          dispatch(setNavigatorPosition('is-aside'));
        });
      }, 500);
    } else {
      dispatch(setNavigatorPosition('is-aside'));
    }
  }
}

export function moveNavData(): MoveNavAsideState {
  return useSelector<ReduxState, MoveNavAsideState>(
    state => ({
      navigatorShape: state.navigatorShape,
      navigatorPosition: state.navigatorPosition,
      isWideScreen: state.isWideScreen,
    }),
    shallowEqual,
  );
}
