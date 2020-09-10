import React, { useEffect } from "react";
import Seo from "../components/Seo";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState, setNavigatorPosition } from "../state/store";

const Home = () => {
  const stateNavPosition = useSelector<ReduxState, string>(
    state => state.navigatorPosition
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (stateNavPosition !== "is-featured") {
      dispatch(setNavigatorPosition("is-featured"));
    }
  }, []);

  return (
    <React.Fragment>
      <Seo />
    </React.Fragment>
  );
};

export default Home;
