import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import {
  useLayoutQuery,
  PostsProps,
  PagesProps
} from "../../src/components/query/LayoutQuery";

import LayoutWrapper from "../../src/components/LayoutWrapper/";
import { ThemeContext } from "styled-components";

import loadable from "@loadable/component";
import { setIsWideScreen, ReduxState } from "../../src/state/store";

const InfoBox = loadable(() => import("../../src/components/InfoBox/InfoBox"));
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
  isWideScreen: boolean;
  posts: PostsProps[];
  pages: PagesProps[];
}

function TopLayout({
  children,
  setIsWideScreen,
  isWideScreen
}: TopLayoutProps) {
  const { posts, pages } = useLayoutQuery();
  const themeContext: ThemeContextProps = useContext(ThemeContext);

  const categories: string[] = category(posts);
  setIsWideScreen(useCurrentWidth(themeContext));

  return (
    <React.Fragment>
      <LayoutWrapper>
        {children}
        <Navigator posts={posts} />
        <ActionsBar categories={categories} />
        {isWideScreen || <InfoBar pages={pages} />}
        {isWideScreen && <InfoBox />}
      </LayoutWrapper>
    </React.Fragment>
  );
}

const getWidth = (): number => {
  let width = 0;

  if (typeof window !== "undefined") {
    width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
  }

  return width;
};

interface ThemeContextProps {
  mediaQueryTresholds: {
    L: number;
  };
}

const useCurrentWidth = (ThemeContext: ThemeContextProps): boolean => {
  // save current window width in the state object
  const [width, setWidth] = useState(getWidth());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = 0;
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

  const mediaQueryL: number = ThemeContext.mediaQueryTresholds.L;
  return width >= mediaQueryL;
};

interface CategoryProps {
  edges: Array<{
    node: {
      frontmatter: {
        category: string;
      };
    };
  }>;
}

const category = (posts: CategoryProps): string[] => {
  let categoryArray = posts.edges.reduce((list: string[], edge: object) => {
    const category = (edge as any).node.frontmatter.category;
    if (category && !~list.indexOf(category)) {
      return list.concat((edge as any).node.frontmatter.category);
    } else {
      return list;
    }
  }, []);
  return categoryArray;
};

const mapStateToProps = (state: ReduxState) => {
  return {
    isWideScreen: state.isWideScreen
  };
};

const mapDispatchToProps = {
  setIsWideScreen
};

export default connect(mapStateToProps, mapDispatchToProps)(TopLayout);
