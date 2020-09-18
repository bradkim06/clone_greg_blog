import React from "react";
import styled, { css } from "styled-components";
import { PostsProps } from "../Query/LayoutQuery";

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
        </Inner>
      </SpringScrollbars>
    </Posts>
  );
};

export const GridWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-gap: 1rem;

  ${props => {
    const { minWidth } = props.theme;
    return css`
      @media ${minWidth.L} {
        padding: 0 1rem;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

        .moving-featured &,
        .is-aside & {
          padding: 0 0.5rem;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }

        .is-aside.closed &,
        .moving-featured.closed & {
          display: none;
        }
      }
    `;
  }}
`;

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
