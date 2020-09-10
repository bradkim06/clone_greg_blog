import React from "react";
import Grow from "@material-ui/core/Grow";
import styled from "styled-components";
import Link from "gatsby-link";

type SearchResultProps = {
  title: string;
  subTitle?: string;
  slug: string;
  linkOnClick: Function;
};

const SearchListItem = ({
  title,
  subTitle,
  slug,
  linkOnClick
}: SearchResultProps) => {
  const titleName = JSON.stringify(title, null, 4);
  const subTitleName = JSON.stringify(subTitle, null, 4);
  const path = JSON.stringify(slug, null, 4);

  function movePage() {
    linkOnClick();
  }

  return (
    <Link onClick={movePage} to={path.replace(/\"/g, "")}>
      <Grow in={true} timeout={500}>
        <SearchWrapper>
          <FlexChild>
            <h2>{titleName.replace(/\"/g, "")}</h2>
            <Divider />
            <small>
              {subTitleName !== "null" && subTitleName.replace(/\"/g, "")}
            </small>
          </FlexChild>
        </SearchWrapper>
      </Grow>
    </Link>
  );
};

const Divider = styled.div`
  aspect-ratio: 16/9;
  margin: 0.5rem 0;

  @media (max-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    margin: 0.25rem 0;
  }
`;

const SearchWrapper = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  place-items: center;
`;

const FlexChild = styled.li`
  width: 80%;
  display: flex;
  word-break: break-all;
  flex-direction: column;
  padding: 1rem;
  color: ${props => props.theme.navigator.colors.postsListItemLink};
  border-radius: 50px;
  background-color: ${props => props.theme.search.colors.listBackground};
  text-align: center;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 1.2s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    color: ${props => props.theme.navigator.colors.postsListItemLinkHover};
    background-color: ${props => props.theme.search.colors.hoverBackground};
  }

  h2 {
    margin: 0;
    font-weight: 700;
  }

  small {
    font-weight: 400;
    font-size: 18px;
  }

  @media (max-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    h2 {
      font-size: 20px;
    }

    small {
      font-size: 14px;
    }
  }

  @media (max-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    h2 {
      font-size: 16px;
    }

    small {
      font-size: 12px;
    }
  }
`;

export default SearchListItem;
