import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Navigator from "../../src/components/Navigator/Navigator";
import InfoBar from "../../src/components/InfoBox/InfoBar";
import InfoBox from "../../src/components/InfoBox";
import ActionsBar from "../../src/components/ActionsBar/ActionsBar";
import LayoutWrapper from "../../src/components/LayoutWrapper/";
import { connect } from "react-redux";
import { StaticQuery, graphql } from "gatsby";
import { useSiteMetadata } from "../../src/components/Test";

import { setFontSizeIncrease, setIsWideScreen } from "../../src/state/store";
import { isWideScreen, timeoutThrottlerHandler } from "../../src/utils/helpers";

const TopLayout = (props) => {
  const { site, posts } = useSiteMetadata();
  const { navigatorPosition, navigatorShape, data } = props;
  let timeouts = {};
  let categories = [];

  useEffect(() => {
    props.setIsWideScreen(isWideScreen());
    if (typeof window !== "undefined") {
      window.addEventListener("resize", resizeThrottler, false);
    }
  });

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const inLocal = +localStorage.getItem("font-size-increase");

      const inStore = props.fontSizeIncrease;

      if (inLocal && inLocal !== inStore && inLocal >= 1 && inLocal <= 1.5) {
        props.setFontSizeIncrease(inLocal);
      }

      getCategories();
    }
  });

  const getCategories = () => {
    categories = posts.edges.reduce((list, edge, i) => {
      const category = edge.node.frontmatter.category;
      if (category && !~list.indexOf(category)) {
        return list.concat(edge.node.frontmatter.category);
      } else {
        return list;
      }
    }, []);
  };

  const resizeThrottler = () => {
    return timeoutThrottlerHandler(timeouts, "resize", 500, resizeHandler);
  };

  const resizeHandler = () => {
    props.setIsWideScreen(isWideScreen());
  };

  return (
    <React.Fragment>
      <LayoutWrapper>
        {props.children}
        {site.siteMetadata.title}
        {site.id}
        {posts.totalCount}
        <Navigator posts={posts.edges} />
        <ActionsBar />
        <InfoBar />
        <InfoBox />
      </LayoutWrapper>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(TopLayout);
