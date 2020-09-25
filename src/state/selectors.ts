import { useSelector as reduxUseSelector, shallowEqual } from 'react-redux';
import { ReduxState } from './store';

/** Application specific strongly typed wrapper around redux's useSelector(). */
function useSelector<T>(fn: (state: ReduxState) => T): T {
  return reduxUseSelector(fn, shallowEqual);
}

export default useSelector;
