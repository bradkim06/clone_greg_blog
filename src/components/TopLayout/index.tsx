import React, { useEffect, useState, useContext, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeContext } from 'styled-components';
import loadable from '@loadable/component';
import LayoutWrapper from './LayoutWrapper';
import { setIsWideScreen } from '../../state/store';
import { useLayoutQuery, PostsProps } from '../Query/LayoutQuery';
import Navigator from '../Navigator';
import ActionsBar from '../Actions';

const InfoBox = loadable(() => import('../Info/Box'));
const InfoBar = loadable(() => import('../Info/Bar'));

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
  node: {
    frontmatter: {
      category?: string | undefined;
    };
  };
};

function getCategories(post: PostsProps): string[] {
  return [
    ...new Set(
      post.edges.map(
        (item: CategoryProps) => item.node.frontmatter.category || '',
      ),
    ),
  ];
}

type TopLayoutProps = {
  children: React.ReactNode;
};

const TopLayout = ({ children }: TopLayoutProps): ReactElement => {
  const { posts, pages } = useLayoutQuery();
  const themeContext = useContext(ThemeContext);

  const categories = getCategories(posts);
  const dispatch = useDispatch();
  const isWideState = useCurrentWidth(themeContext);

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
