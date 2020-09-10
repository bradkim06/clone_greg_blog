import React, { useEffect } from "react";
import Seo from "../components/Seo";
import { useDispatch } from "react-redux";
import { moveNavFeature, moveNavData } from "../utils/shared";

const Home = () => {
  const state = moveNavData();
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.navigatorPosition === "is-aside") {
      moveNavFeature(null, state, dispatch);
    }
  }, []);

  return (
    <React.Fragment>
      <Seo />
    </React.Fragment>
  );
};

export default Home;
