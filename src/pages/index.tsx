import React, { useEffect, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Seo from '../components/Seo';
import { ReduxState, setNavigatorPosition } from '../state/store';

const Home = (): ReactElement => {
  const stateNavPosition = useSelector<ReduxState, string>(
    state => state.navigatorPosition,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (stateNavPosition !== 'is-featured') {
      dispatch(setNavigatorPosition('is-featured'));
    }
  }, []);

  return <>{Seo}</>;
};

export default Home;
