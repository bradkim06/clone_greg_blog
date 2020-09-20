import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { PostsProps } from '../Query/LayoutQuery';
import {
  setNavigatorShape,
  setCategoryFilter,
  ReduxState,
} from '../../state/store';
import { moveNavAside, moveNavData } from '../../utils/shared';
import List from './List';

const StyleNavigator = styled.nav`
  transform: translate3d(0, 0, 0);
  will-change: left, top, bottom, width;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  transition-timing-function: ease;
  transition: left 0.7s;
  width: 100%;

  ${props => {
    const { navigator, info, bars, base, maxWidth, minWidth } = props.theme;
    return css`
      background: ${navigator.colors.background};

      @media ${maxWidth.L} {
        &.is-aside {
          left: -100%;
        }

        &.is-featured {
          left: 0;
        }
      }

      @media ${minWidth.L} {
        &.is-featured {
          transition: left 0.7s;
          width: calc(100vw - ${info.size.width} - ${bars.size.actionsBar});
          left: ${info.size.width};
          top: 0;
        }

        &.is-aside {
          transition: bottom 0.5s;
          left: 0;
          width: calc(${info.size.width} - 1px);
          z-index: 1;
          top: auto;

          &.closed {
            bottom: calc(-100% + 6.25rem + ${navigator.size.closedHeight});
            height: calc(100% - 6.25rem);
          }

          &.open {
            bottom: 0;
            height: calc(100% - 6.25rem);
          }

          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: ${base.sizes.linesMargin};
            right: ${base.sizes.linesMargin};
            height: 0;
            border-top: 1px solid ${base.colors.lines};
          }
        }

        &.moving-aside {
          left: calc(-100vw + ${info.sizes.width}*2px + 2px);
          width: calc(100vw - ${info.sizes.width}px - 60px);
          top: 0;
        }

        &.resizing-aside {
          transition: none;
          width: ${info.sizes.width}px;
          top: auto;
          left: 0;

          &.closed {
            bottom: calc(-100% + 6.25rem);
            height: calc(100% - 6.25rem);
          }

          &.open {
            bottom: calc(-100% + 6.25rem);
            height: calc(100% - 6.25rem);
          }
        }

        &.moving-featured {
          transition: bottom 0.3s;
          bottom: -100%;
          top: auto;
          left: 0;
          z-index: 1;
          width: calc(${info.size.width} - 1px);
        }

        &.resizing-featured {
          transition: none;
          top: 0;
          bottom: auto;
          left: calc(-100vw + ${info.size.width}*2 + 60px);
          width: calc(100vw - ${info.size.width} - 60px);
        }
      }
    `;
  }}
`;

type NavigatorProps = {
  posts: PostsProps;
};

export default ({ posts }: NavigatorProps) => {
  const stateFilter = useSelector<ReduxState, string>(
    state => state.categoryFilter,
  );
  const state = moveNavData();
  const dispatch = useDispatch();

  function expandOnClick() {
    dispatch(setNavigatorShape('open'));
  }

  function linkOnClick() {
    moveNavAside(state, dispatch);
  }

  function removefilterOnClick() {
    dispatch(setCategoryFilter('all posts'));
  }

  return (
    <StyleNavigator
      className={`${state.navigatorPosition ? state.navigatorPosition : ''} ${
        state.navigatorShape ? state.navigatorShape : ''
      } `}
    >
      {posts.totalCount && (
        <List
          posts={posts}
          navigatorPosition={state.navigatorPosition}
          navigatorShape={state.navigatorShape}
          linkOnClick={linkOnClick}
          expandOnClick={expandOnClick}
          categoryFilter={stateFilter}
          removeFilter={removefilterOnClick}
        />
      )}
    </StyleNavigator>
  );
};
