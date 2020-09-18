import React from "react";
import styled, { css } from "styled-components";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

type ListHeaderProps = {
  expandOnClick(event: React.MouseEvent<HTMLButtonElement>): void;
  removeFilter(event: React.MouseEvent<HTMLButtonElement>): void;
  categoryFilter: string;
  navigatorShape: string;
};

export default ({
  expandOnClick,
  categoryFilter,
  navigatorShape,
  removeFilter
}: ListHeaderProps) => {
  return (
    <header>
      {navigatorShape === "closed" && (
        <Closed>
          <h1>List of posts</h1>
          <IconButton
            aria-label="Expand the list"
            onClick={expandOnClick}
            title="Expand the list"
            className="expandButton"
          >
            <ExpandLessIcon />
          </IconButton>
        </Closed>
      )}
      {navigatorShape === "open" && categoryFilter !== "all posts" && (
        <Filter>
          <small>Active Category Filter:</small>
          <strong>{categoryFilter}</strong>
          <IconButton
            aria-label="Remove filtering"
            onClick={removeFilter}
            title="Clear filtering"
            className="removeButton"
          >
            <CloseIcon />
          </IconButton>
        </Filter>
      )}
    </header>
  );
};

const Closed = styled.div`
  display: none;

  ${props => {
    const { navigator } = props.theme;
    return css`
      .is-aside.closed &,
      .moving-featured.closed & {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        margin: 0;
        height: ${navigator.sizes.closedHeight}px;
        padding: 0 30px 0 40px;
      }

      & h1 {
        font-size: 1.1em;
        color: ${navigator.colors.postsHeader};
        font-weight: 600;
        margin: -0.2em 0 0 0;
        text-transform: uppercase;
        & small {
          font-size: 0.6em;
          display: block;
          margin: 0 0 0.1em;
          font-weight: 300;
          letter-spacing: 0.2em;
        }
      }

      .expandButton {
        color: ${navigator.colors.postsHeader};
      }
    `;
  }}
`;

const Filter = styled.div`
  position: relative;
  font-size: 1.2em;
  line-height: 1;
  padding: 0 1em 1em;
  font-weight: 300;

  & strong {
    font-weight: 600;
    display: block;
  }
  & small {
    display: block;
    margin: 0 0 0.3em 0;
  }

  ${props => {
    const { base, navigator, minWidth } = props.theme;
    return css`
      color: ${base.colors.accent};
      border-bottom: 1px solid ${base.colors.lines};
      margin: 0 calc(-0.5rem + ${base.sizes.linesMargin}) 1em
        calc(-0.5rem + ${base.sizes.linesMargin});
      .removeButton {
        position: absolute;
        top: 0;
        right: 0;
        color: ${navigator.colors.postsHeader};
      }
      @media ${minWidth.L} {
        margin: 0 0 1em 0;
        padding: 0 1em 1.5em;
        .is-aside & {
          padding: 0 0 1em 0.5em;
          margin: 0 calc(-0.5rem + ${base.sizes.linesMargin}) 1em
            calc(-0.5rem + ${base.sizes.linesMargin});
        }
      }
    `;
  }}
`;
