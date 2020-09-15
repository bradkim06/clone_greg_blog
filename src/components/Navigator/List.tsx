import React from "react";
import styled from "styled-components";
import { PostsProps } from "../Query/LayoutQuery";
import Grow from "@material-ui/core/Grow";

import ListHeader from "./ListHeader";
import ListItem from "./ListItem";
import SpringScrollbars from "../Scroll";

type ListProps = {
  posts: PostsProps;
  linkOnClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  expandOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  removeFilter: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
          <Grow in={true} timeout={1500}>
            <GridWrapper>
              {posts.edges &&
                posts.edges.map((post, i) => (
                  <ListItem
                    key={i}
                    post={post}
                    linkOnClick={linkOnClick}
                    categoryFilter={categoryFilter}
                  />
                ))}
            </GridWrapper>
          </Grow>
        </Inner>
      </SpringScrollbars>
    </Posts>
  );
};

const GridWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 1rem;
  display: grid;
  align-items: stretch;
  justify-items: stretch; /* adjusted */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;

  .moving-featured &,
  .is-aside & {
    // grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    h1 {
      font-size: 1em;
    }
    small {
      font-size: 0.8em;
    }
  }
`;

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
