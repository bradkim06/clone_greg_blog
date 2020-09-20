import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeContext } from 'styled-components';
import LayoutWrapper from './LayoutWrapper';
import { setIsWideScreen } from '../../src/state/store';
import { useLayoutQuery } from '../../src/components/Query/LayoutQuery';
import InfoBox from '../../src/components/Info/Box';
import Navigator from '../../src/components/Navigator';
import ActionsBar from '../../src/components/Actions/Bar';
import InfoBar from '../../src/components/Info/Bar';

function getWidth(): number {
  let width = 0;

  if (typeof window !== 'undefined') {
    width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
  }

  return width;
}

function useCurrentWidth(theme: {
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
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  const mediaQueryL = theme.mediaQueryTresholds.L;
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

function getCategory(posts: CategoryProps): string[] {
  const categoryArray = posts.edges.reduce((list: (string | any)[], edge) => {
    const { category } = edge.node.frontmatter;
    if (category && !~list.indexOf(category)) {
      return list.concat(edge.node.frontmatter.category);
    }
    return list;
  }, []);
  return categoryArray;
}

const TopLayout: React.FC<null> = ({ children }) => {
  const { posts, pages } = useLayoutQuery();
  const themeContext = useContext(ThemeContext);
  const categories = getCategory(posts);

  const isWideState = useCurrentWidth(themeContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsWideScreen(isWideState));
  }, [isWideState]);

  return (
    <>
      <LayoutWrapper>
        {children}
        <Navigator posts={posts} />
        <ActionsBar categories={categories} />
        {isWideState || <InfoBar pages={pages} />}
        {isWideState && <InfoBox />}
      </LayoutWrapper>
    </>
  );
};

export default TopLayout;
