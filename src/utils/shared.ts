import { navigate } from '@reach/router';
import { useSelector, shallowEqual } from 'react-redux';
import store, {
  setNavigatorShape,
  setNavigatorPosition,
  ReduxState,
} from '../state/store';

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

export function moveNavFeature(e: React.MouseEvent): void {
  e.preventDefault();
  const state = store.getState();

  if (state.navigatorPosition === 'is-aside') {
    if (state.isWideScreen) {
      store.dispatch(setNavigatorPosition('moving-featured'));

      setTimeout(() => {
        store.dispatch(setNavigatorPosition('resizing-featured'));
        store.dispatch(setNavigatorPosition('is-featured'));
        store.dispatch(setNavigatorShape('open'));
      }, 500);
    } else {
      setTimeout(() => {
        store.dispatch(setNavigatorPosition('is-featured'));
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

export function moveNavAside(): void {
  const state = store.getState();
  if (state.navigatorPosition === 'is-featured') {
    if (state.isWideScreen) {
      store.dispatch(setNavigatorPosition('moving-aside'));

      setTimeout(() => {
        store.dispatch(setNavigatorPosition('resizing-aside'));
        setTimeout(() => {
          store.dispatch(setNavigatorPosition('is-aside'));
        });
      }, 500);
    } else {
      store.dispatch(setNavigatorPosition('is-aside'));
    }
  }
}
