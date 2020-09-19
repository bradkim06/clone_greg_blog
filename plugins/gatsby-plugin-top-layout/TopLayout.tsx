import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import LayoutWrapper from "./LayoutWrapper";
import { ThemeContext } from "styled-components";
import loadable from "@loadable/component";
import { setIsWideScreen } from "../../src/state/store";
import { useLayoutQuery } from "../../src/components/Query/LayoutQuery";

const InfoBox = loadable(() => import("../../src/components/Info/Box"));
const Navigator = loadable(() => import("../../src/components/Navigator"));
const ActionsBar = loadable(() => import("../../src/components/Actions/Bar"));
const InfoBar = loadable(() => import("../../src/components/Info/Bar"));

const TopLayout: React.FC<null> = ({ children }) => {
  const { posts, pages } = useLayoutQuery();
  const themeContext = useContext(ThemeContext);
  const categories = category(posts);

  const isWideState = useCurrentWidth(themeContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsWideScreen(isWideState));
  }, [isWideState]);

  return (
    <React.Fragment>
      <LayoutWrapper>
        {children}
        <Navigator posts={posts} />
        <ActionsBar categories={categories} />
        {isWideState || <InfoBar pages={pages} />}
        {isWideState && <InfoBox />}
      </LayoutWrapper>
    </React.Fragment>
  );
};

function getWidth(): number {
  let width = 0;

  if (typeof window !== "undefined") {
    width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
  }

  return width;
}

function useCurrentWidth(ThemeContext: {
  mediaQueryTresholds: { L: number };
}): boolean {
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

  const mediaQueryL = ThemeContext.mediaQueryTresholds.L;
  return width >= mediaQueryL;
}

type CategoryProps = {
  edges: Array<{
    node: {
      frontmatter: {
        category: string;
      };
    };
  }>;
};

function category(posts: CategoryProps): string[] {
  const categoryArray = posts.edges.reduce((list: (string | any)[], edge) => {
    const category = edge.node.frontmatter.category;
    if (category && !~list.indexOf(category)) {
      return list.concat(edge.node.frontmatter.category);
    } else {
      return list;
    }
  }, []);
  return categoryArray;
}

export default TopLayout;
