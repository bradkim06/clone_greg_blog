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
    <StyledLink onClick={movePage} to={path.replace(/\"/g, "")}>
      <Grow in={true} timeout={500}>
        <SearchWrapper>
          <FlexChild>
            <p>{titleName.replace(/\"/g, "")}</p>
            <small>
              {subTitleName !== "null" && subTitleName.replace(/\"/g, "")}
            </small>
          </FlexChild>
        </SearchWrapper>
      </Grow>
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  color: ${props => props.theme.navigator.colors.postsListItemLink};

  &:hover {
    color: ${props => props.theme.navigator.colors.postsListItemLinkHover};
  }
`;

const SearchWrapper = styled.ul`
  list-style: none;
  display: grid;
  place-items: center;

  width: 100%;
  height: 100px;

  resize: both;
  overflow: auto;
`;

const FlexChild = styled.li`
  width: 90%;
  height: 90px;
  padding: 0.5rem;
  font-size: ${props => props.theme.main.fonts.subTitle.size}em;
  text-align: center;
  border-radius: 10px;
  white-space: nowrap;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  p {
    margin: 0;
  }
`;

export default SearchListItem;
