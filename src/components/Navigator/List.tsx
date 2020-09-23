import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { PostsProps } from '../Query/LayoutQuery';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import GrowList from './GrowList';
import Scroll from '../Scroll';

const Posts = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
`;

const Inner = styled.div`
  ${props => {
    const { minWidth, bars, info } = props.theme;
    return css`
      padding: calc(${bars.sizes.infoBar}px + 1.3rem) 1.3rem
        calc(${bars.sizes.actionsBar}px + 1.3rem) 1.3rem;

      @media ${minWidth.M} {
        padding: calc(${bars.sizes.infoBar}px + 2rem) 2rem
          calc(${bars.sizes.actionsBar}px + 2rem) 2rem;
      }

      @media ${minWidth.L} {
        padding: 2rem calc(1rem + 17px) calc(2rem + 17px) 2rem;
        left: ${info.sizes.width}px;
        .moving-featured &,
        .is-aside & {
          padding: 1rem 0.5rem 1rem 0.5rem;
        }
      }
    `;
  }}
`;

type ListProps = {
  posts: PostsProps;
  linkOnClick: () => void;
  expandOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  removeFilter: (event: React.MouseEvent<HTMLButtonElement>) => void;
  navigatorShape: string;
  categoryFilter: string;
};

function List({
  posts,
  linkOnClick,
  expandOnClick,
  removeFilter,
  categoryFilter,
  navigatorShape,
}: ListProps): ReactElement {
  return (
    <Posts>
      <Scroll>
        <Inner>
          <ListHeader
            expandOnClick={expandOnClick}
            categoryFilter={categoryFilter}
            navigatorShape={navigatorShape}
            removeFilter={removeFilter}
          />
          <GrowList>
            {posts.edges &&
              posts.edges.map(post => (
                <ListItem
                  key={post.node.id}
                  post={post}
                  linkOnClick={linkOnClick}
                  categoryFilter={categoryFilter}
                />
              ))}
          </GrowList>
        </Inner>
      </Scroll>
    </Posts>
  );
}

export default List;
