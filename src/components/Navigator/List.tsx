import React from "react";
import styled from "styled-components";
import { PostsProps } from "../Query/LayoutQuery";

import ListHeader from "./ListHeader";
import ListItem from "./ListItem";
import SpringScrollbars from "../Scroll";

type ListProps = {
  posts: PostsProps;
  linkOnClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  expandOnClick(event: React.MouseEvent<HTMLButtonElement>): void;
  removeFilter(event: React.MouseEvent<HTMLButtonElement>): void;
  navigatorPosition: string;
  navigatorShape: string;
  categoryFilter: string;
};

export default ({
  posts,
  linkOnClick,
  expandOnClick,
  removeFilter,
  categoryFilter,
  navigatorShape
}: ListProps) => {
  return (
    <Posts>
      <SpringScrollbars forceCheckOnScroll={true} isNavigator={true}>
        <Inner>
          <ListHeader
            expandOnClick={expandOnClick}
            categoryFilter={categoryFilter}
            navigatorShape={navigatorShape}
            removeFilter={removeFilter}
          />
          <PostList>
            {posts.edges &&
              posts.edges.map((post, i) => (
                <ListItem
                  key={i}
                  post={post}
                  linkOnClick={linkOnClick}
                  categoryFilter={categoryFilter}
                />
              ))}
          </PostList>
        </Inner>
      </SpringScrollbars>
    </Posts>
  );
};

const Posts = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
`;

const Inner = styled.div`
  padding: calc(${props => props.theme.bars.sizes.infoBar}px + 1.3rem) 1.3rem
    calc(${props => props.theme.bars.sizes.actionsBar}px + 1.3rem) 1.3rem;

  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    padding: calc(${props => props.theme.bars.sizes.infoBar}px + 2rem) 2rem
      calc(${props => props.theme.bars.sizes.actionsBar}px + 2rem) 2rem;
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    padding: 2rem calc(1rem + 17px) calc(2rem + 17px) 2rem;
    left: ${props => props.theme.info.sizes.width}px;
    .moving-featured &,
    .is-aside & {
      padding: 1rem 0.5rem 1rem 0.5rem;
    }
  }
`;

const PostList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  .is-aside.closed &,
  .moving-featured.closed & {
    display: none;
  }
`;
