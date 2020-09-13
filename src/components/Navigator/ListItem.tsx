import React, { useState, useEffect } from "react";
import SearchListItem from "../Actions/SearchListItem";

import styled from "styled-components";

interface ListItemProps {
  post: {
    node: {
      excerpt: string;
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
        subTitle?: string;
        date?: string;
        category?: string;
      };
    };
  };
  categoryFilter: string;
  linkOnClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export default ({ post, categoryFilter, linkOnClick }: ListItemProps) => {
  const {
    frontmatter: { category, title, subTitle, date },
    fields: { slug }
  } = post.node;

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (categoryFilter === "all posts") {
      setHidden(false);
    } else if (category !== categoryFilter) {
      setHidden(true);
    } else if (category === categoryFilter) {
      setHidden(false);
    }
  }, [categoryFilter]);

  return (
    <StyledListItem>
      <div
        className={`${category}`}
        style={{ display: `${hidden ? "none" : "block"}` }}
        key={slug}
      >
        <SearchListItem
          title={title}
          subTitle={subTitle}
          slug={slug}
          linkOnClick={linkOnClick}
        />
      </div>
    </StyledListItem>
  );
};

const StyledListItem = styled.div`
  & ul {
    padding: 0;
    list-style: none;
  }
  & li {
    margin: 0 0 0.7em 0;

    @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
      .moving-featured &,
      .is-aside & {
        padding: 0.8rem 0.5rem 0 0.5rem;
        text-align: center;

        h1 {
          font-size: 0.9em;
        }

        small {
          display: none;
        }
      }
    }
  }
`;

// const StyledLink = styled(Link)`
//   display: flex;
//   align-content: center;
//   align-items: center;
//   justify-content: flex-start;
//   flex-direction: row;
//   padding: 0.7em 1em 0.7em 1em;
//   color: ${props => props.theme.navigator.colors.postsListItemLink};
//
//   @media (hover: hover) {
//     &:hover {
//       color: ${props => props.theme.navigator.colors.postsListItemLinkHover};
//       & .pointer {
//         border-radius: 65% 75%;
//       }
//     }
//   }
// `;

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

// const ListItemText = styled.div`
//   margin: 0 0 0 1.5em;
//   flex-grow: 1;
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   text-align: center;
//
//   & h1 {
//     line-height: 1.15;
//     font-weight: 600;
//     letter-spacing: -0.03em;
//     margin: 0;
//     font-size: ${props => props.theme.navigator.sizes.postsListItemH1Font}em;
//
//     @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
//       font-size: ${props =>
//         props.theme.navigator.sizes.postsListItemH1Font *
//         props.theme.navigator.sizes.fontIncraseForM}em;
//     }
//
//     @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
//       font-size: ${props =>
//         props.theme.navigator.sizes.postsListItemH1Font *
//         props.theme.navigator.sizes.fontIncraseForL}em;
//       .moving-featured &,
//       .is-aside & {
//         font-size: 1em;
//         font-weight: 400;
//       }
//     }
//   }
//
//   & h2 {
//     line-height: 1.2;
//     display: block;
//     font-size: ${props => props.theme.navigator.sizes.postsListItemH2Font}em;
//     margin: 0.3em 0 0 0;
//
//     @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
//       font-size: ${props =>
//         props.theme.navigator.sizes.postsListItemH2Font *
//         props.theme.navigator.sizes.fontIncraseForM}em;
//     }
//
//     @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
//       font-size: ${props =>
//         props.theme.navigator.sizes.postsListItemH2Font *
//         props.theme.navigator.sizes.fontIncraseForL}em;
//       .moving-featured &,
//       .is-aside & {
//         display: none;
//       }
//     }
//   }
//
//   @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
//     .moving-featured &,
//     .is-aside & {
//       margin: 0 0 0 0.5em;
//     }
//   }
// `;
