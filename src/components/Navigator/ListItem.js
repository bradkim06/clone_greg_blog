import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
// import LazyLoad from "react-lazyload";

import styled from "@emotion/styled";
import theme from "../../styles/theme";
import { css } from "emotion";

class ListItem extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    linkOnClick: PropTypes.func.isRequired,
    categoryFilter: PropTypes.string.isRequired,
  };

  state = {
    hidden: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.categoryFilter !== this.props.categoryFilter) {
      const category = this.props.post.node.frontmatter.category;
      const categoryFilter = this.props.categoryFilter;

      if (categoryFilter === "all posts") {
        this.setState({ hidden: false });
      } else if (category !== categoryFilter) {
        this.setState({ hidden: true });
      } else if (category === categoryFilter) {
        this.setState({ hidden: false });
      }
    }
  }

  render() {
    const { post, linkOnClick } = this.props;
    return (
      <StyledListItem>
        <ul>
          <li
            className={`${post.node.frontmatter.category}`}
            style={{ display: `${this.state.hidden ? "none" : "block"}` }}
            key={post.node.fields.slug}
          >
            <Link
              activeClassName="active"
              className={link(theme)}
              to={post.node.fields.slug}
              onClick={linkOnClick}
            >
              <ListItemText>
                <h1>{post.node.frontmatter.title} </h1>

                {post.node.frontmatter.subTitle && (
                  <h2>{post.node.frontmatter.subTitle}</h2>
                )}
              </ListItemText>
            </Link>
          </li>
        </ul>
      </StyledListItem>
    );
  }
}

const StyledListItem = styled.div`
  & li {
    margin: 0 0 0.7em 0;
    transition: height 1s;

    @media (min-width: ${(props) => props.theme.mediaQueryTresholds.M}px) {
      margin: 0 0 1.5rem 0;
    }

    @media (min-width: ${(props) => props.theme.mediaQueryTresholds.L}px) {
      .moving-featured &,
      .is-aside & {
        margin: 0 0 0 0;
      }
    }
  }
`;

const link = (theme) => css`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  padding: 0.7em 1em 0.7em 1em;
  color: ${theme.navigator.colors.postsListItemLink};

  @media (hover: hover) {
    &:hover {
      color: ${theme.navigator.colors.postsListItemLinkHover};
      & .pointer {
        border-radius: 65% 75%;
      }
    }
  }
`;

// const ListItemPointer = styled.div`
//   position: relative;
//   flex-shrink: 0;
//   overflow: hidden;
//   border-radius: 75% 65%;
//   width: 60px;
//   margin: 0;
//   transition: all 0.5s;
//
//   & img {
//     width: 100%;
//     height: 100%;
//   }
//
//   @media (min-width: ${(props) => props.theme.mediaQueryTresholds.M}px) {
//     margin-right: 0.5em;
//     width: 80px;
//     height: 80px;
//   }
//
//   @media (min-width: ${(props) => props.theme.mediaQueryTresholds.L}px) {
//     margin-right: 0.8em;
//     width: 90px;
//     height: 90px;
//     transition: all 0.3s;
//     transition-timing-function: ease;
//
//     .moving-featured &,
//     .is-aside & {
//       width: 30px;
//       height: 30px;
//     }
//   }
// `;

const ListItemText = styled.div`
  margin: 0 0 0 1.5em;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;

  & h1 {
    line-height: 1.15;
    font-weight: 600;
    letter-spacing: -0.03em;
    margin: 0;
    font-size: ${(props) => props.theme.navigator.sizes.postsListItemH1Font}em;

    @media (min-width: ${(props) => props.theme.mediaQueryTresholds.M}px) {
      font-size: ${(props) =>
        props.theme.navigator.sizes.postsListItemH1Font *
        props.theme.navigator.sizes.fontIncraseForM}em;
    }

    @media (min-width: ${(props) => props.theme.mediaQueryTresholds.L}px) {
      font-size: ${(props) =>
        props.theme.navigator.sizes.postsListItemH1Font *
        props.theme.navigator.sizes.fontIncraseForL}em;
      .moving-featured &,
      .is-aside & {
        font-size: 1em;
        font-weight: 400;
      }
    }
  }

  & h2 {
    line-height: 1.2;
    display: block;
    font-size: ${(props) => props.theme.navigator.sizes.postsListItemH2Font}em;
    margin: 0.3em 0 0 0;

    @media (min-width: ${(props) => props.theme.mediaQueryTresholds.M}px) {
      font-size: ${(props) =>
        props.theme.navigator.sizes.postsListItemH2Font *
        props.theme.navigator.sizes.fontIncraseForM}em;
    }

    @media (min-width: ${(props) => props.theme.mediaQueryTresholds.L}px) {
      font-size: ${(props) =>
        props.theme.navigator.sizes.postsListItemH2Font *
        props.theme.navigator.sizes.fontIncraseForL}em;
      .moving-featured &,
      .is-aside & {
        display: none;
      }
    }
  }

  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.L}px) {
    .moving-featured &,
    .is-aside & {
      margin: 0 0 0 0.5em;
    }
  }
`;

export default ListItem;
