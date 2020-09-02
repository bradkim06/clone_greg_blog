import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useLayoutQuery } from "../../src/components/query/LayoutQuery";

import Navigator from "../../src/components/Navigator/Navigator";
import ActionsBar from "../../src/components/ActionsBar/ActionsBar";
import InfoBar from "../../src/components/InfoBox/InfoBar";
import InfoBox from "../../src/components/InfoBox";
import LayoutWrapper from "../../src/components/LayoutWrapper/";

import { setFontSizeIncrease, setIsWideScreen } from "../../src/state/store";
import { isWideScreen, timeoutThrottlerHandler } from "../../src/utils/helpers";

const propTypes = {
  layoutData: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  setIsWideScreen: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
  fontSizeIncrease: PropTypes.number.isRequired,
  setFontSizeIncrease: PropTypes.func.isRequired,
};

const TopLayout = (props) => {
  const { posts, pages } = useLayoutQuery();
  const {
    navigatorPosition,
    navigatorShape,
    children,
    setIsWideScreen,
    fontSizeIncrease,
    setFontSizeIncrease,
  } = props;
  let timeouts = {};
  const categories = category({ posts });

  useEffect(() => {
    setIsWideScreen(isWideScreen());
    // wastefull code
    // if (typeof window !== "undefined") {
    //   window.addEventListener("resize", resizeThrottler, false);
    // }

    // if (typeof localStorage !== "undefined") {
    //   const inLocal = +localStorage.getItem("font-size-increase");
    //
    //   const inStore = fontSizeIncrease;
    //
    //   if (inLocal && inLocal !== inStore && inLocal >= 1 && inLocal <= 1.5) {
    //     setFontSizeIncrease(inLocal);
    //   }
    // }
  });

  // const resizeThrottler = () => {
  //   return timeoutThrottlerHandler(timeouts, "resize", 500, resizeHandler);
  // };
  //
  // const resizeHandler = () => {
  //   setIsWideScreen(isWideScreen());
  // };

  return (
    <React.Fragment>
      <LayoutWrapper>
        {children}
        <Navigator posts={posts} />
        <ActionsBar categories={categories} />
        <InfoBar />
        {isWideScreen && <InfoBox />}
      </LayoutWrapper>
    </React.Fragment>
  );
};

const category = ({ posts }) => {
  let categories = (categories = posts.edges.reduce((list, edge) => {
    const category = edge.node.frontmatter.category;
    if (category && !~list.indexOf(category)) {
      return list.concat(edge.node.frontmatter.category);
    } else {
      return list;
    }
  }, []));
  return categories;
};

const mapStateToProps = (state) => {
  return {
    pages: state.pages,
    isWideScreen: state.isWideScreen,
    fontSizeIncrease: state.fontSizeIncrease,
    navigatorPosition: state.navigatorPosition,
    navigatorShape: state.navigatorShape,
  };
};

const mapDispatchToProps = {
  setIsWideScreen,
  setFontSizeIncrease,
};

TopLayout.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(TopLayout);
