import React from "react";
import Grow from "@material-ui/core/Grow";
import styled from "styled-components";
import Link from "gatsby-link";

interface SearchResultProps {
  title: string;
  subTitle?: string;
  slug: string;
  linkOnClick: () => void;
}

function SearchListItem({
  title,
  subTitle,
  slug,
  linkOnClick
}: SearchResultProps) {
  const titleName = JSON.stringify(title, null, 4);
  const subTitleName = JSON.stringify(subTitle, null, 4);
  const path = JSON.stringify(slug, null, 4);

  const movePage = () => {
    linkOnClick();
  };

  return (
    <Link onClick={movePage} to={path.replace(/\"/g, "")}>
      <Grow in={true} timeout={500}>
        <SearchWrapper>
          <FlexChild>
            <h3>{titleName.replace(/\"/g, "")}</h3>
            <Divider />
            <small>
              {subTitleName !== "null" && subTitleName.replace(/\"/g, "")}
            </small>
          </FlexChild>
        </SearchWrapper>
      </Grow>
    </Link>
  );
}

const Divider = styled.div`
  aspect-ratio: 16/9;
  background: red;
  margin: 0.5rem 0;
`;

const SearchWrapper = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  place-items: center;
`;

const FlexChild = styled.li`
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  color: ${props => props.theme.navigator.colors.postsListItemLink};
  border-radius: 20px;
  background-color: ${props => props.theme.search.colors.listBackground};

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
      0 10px 10px rgba(0, 0, 0, 0.22);
    color: ${props => props.theme.navigator.colors.postsListItemLinkHover};
  }

  h3 {
    margin: 0;
    font-weight: 700;
  }

  small {
    font-weight: 400;
  }
`;

export default SearchListItem;
