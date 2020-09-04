import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useLayoutQuery } from "../../src/components/query/LayoutQuery";
import theme from "../../src/styles/theme";

import Navigator from "../../src/components/Navigator/Navigator";
import ActionsBar from "../../src/components/ActionsBar/ActionsBar";
import InfoBar from "../../src/components/InfoBox/InfoBar";
import InfoBox from "../../src/components/InfoBox";
import LayoutWrapper from "../../src/components/LayoutWrapper/";

import { setIsWideScreen } from "../../src/state/store";

const propTypes = {
  children: PropTypes.object.isRequired,
  setIsWideScreen: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
};

function TopLayout({ children, setIsWideScreen, isWideScreen }) {
  const { posts, pages } = useLayoutQuery();

  const categories = category(posts);

  setIsWideScreen(useCurrentWidth());
  console.log(isWideScreen);

  return (
    <React.Fragment>
      <LayoutWrapper>
        {children}
        <Navigator posts={posts} />
        <ActionsBar categories={categories} />
        <InfoBar pages={pages} />
        <InfoBox />
      </LayoutWrapper>
    </React.Fragment>
  );
}

const getWidth = () => {
  if (typeof window !== "undefined") {
    return (
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    );
  }
};

export function useCurrentWidth() {
  // save current window width in the state object
  const [width, setWidth] = useState(getWidth());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = null;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setWidth(getWidth()), 200);
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const mediaQueryL = theme.mediaQueryTresholds.L;
  return width >= mediaQueryL;
}

const category = (posts) => {
  let categoryArray = posts.edges.reduce((list, edge) => {
    const category = edge.node.frontmatter.category;
    if (category && !~list.indexOf(category)) {
      return list.concat(edge.node.frontmatter.category);
    } else {
      return list;
    }
  }, []);
  return categoryArray;
};

const mapStateToProps = (state) => {
  return {
    isWideScreen: state.isWideScreen,
  };
};

const mapDispatchToProps = {
  setIsWideScreen,
};

TopLayout.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(TopLayout);
