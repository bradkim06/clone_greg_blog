import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { useLayoutQuery } from "../../src/components/query/LayoutQuery";

import LayoutWrapper from "../../src/components/LayoutWrapper/";
import { ThemeContext } from "styled-components";

import loadable from "@loadable/component";
import { setIsWideScreen } from "../../src/state/store";

const InfoBox = loadable(() => import("../../src/components/InfoBox"));
const Navigator = loadable(
  () => import("../../src/components/Navigator/Navigator")
);
const ActionsBar = loadable(
  () => import("../../src/components/ActionsBar/ActionsBar")
);
const InfoBar = loadable(() => import("../../src/components/InfoBox/InfoBar"));

interface TopLayoutProps {
  children?: any;
  setIsWideScreen: (val: boolean) => void;
}

function TopLayout({ children, setIsWideScreen }: TopLayoutProps) {
  const { posts, pages } = useLayoutQuery();
  const themeContext = useContext(ThemeContext);

  const categories = category(posts);
  setIsWideScreen(useCurrentWidth(themeContext));

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

interface ThemeContextProps {
  mediaQueryTresholds: {
    L: number;
  };
}

export function useCurrentWidth(ThemeContext: ThemeContextProps) {
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

  const mediaQueryL = ThemeContext.mediaQueryTresholds.L;
  return width >= mediaQueryL;
}

interface CategoryProps {
  edges: Array<{
    node: {
      frontmatter: {
        category: string;
      };
    };
  }>;
}

const category = (posts: CategoryProps) => {
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

interface ReduxState {
  isWideScreen: boolean;
}
const mapStateToProps = (state: ReduxState) => {
  return {
    isWideScreen: state.isWideScreen
  };
};

const mapDispatchToProps = {
  setIsWideScreen
};

export default connect(mapStateToProps, mapDispatchToProps)(TopLayout);
