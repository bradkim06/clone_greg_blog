import React from "react";
import Grow from "@material-ui/core/Grow";
import styled from "styled-components";
import Link from "gatsby-link";
import avatar from "../../images/jpg/test.png";

type SearchResultProps = {
  title: string;
  subTitle?: string;
  slug: string;
  linkOnClick: Function;
};

export default ({ title, subTitle, slug, linkOnClick }: SearchResultProps) => {
  const titleName = JSON.stringify(title, null, 4).replace(/\"/g, "");
  const subTitleName = JSON.stringify(subTitle, null, 4).replace(/\"/g, "");
  const path = JSON.stringify(slug, null, 4).replace(/\"/g, "");

  function movePage() {
    linkOnClick();
  }

  return (
    <Grow in={true} timeout={500}>
      <Link onClick={movePage} to={path}>
        <SearchWrapper>
          <FlexChild>
            <ImgFlex>
              <ImgSource src={avatar} />
            </ImgFlex>
            <TextFlex>
              <h1>{titleName}</h1>
              <Divider />
              <small>{subTitleName !== "null" && subTitleName}</small>
            </TextFlex>
          </FlexChild>
        </SearchWrapper>
      </Link>
    </Grow>
  );
};

const Divider = styled.div`
  aspect-ratio: 16/9;
  margin: 0.5rem 0;

  @media (max-width: ${({ theme }) => theme.mediaQueryTresholds.M}px) {
    margin: 0.25rem 0;
  }
`;

const ImgSource = styled.img`
  overflow: hidden;
  width: 80%;
  height: 80%;

  // @media (min-width: ${({ theme }) => theme.mediaQueryTresholds.M}px) {
  //   width: 80px;
  //   height: 80px;
  // }
  //
  // @media (min-width: ${({ theme }) => theme.mediaQueryTresholds.L}px) {
  //   width: 90px;
  //   height: 90px;
  //
  //   .moving-featured &,
  //   .is-aside & {
  //     width: 30px;
  //     height: 30px;
  //   }
  // }
`;

const SearchWrapper = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  place-items: center;
`;

const ImgFlex = styled.div`
  margin-left: 3%;
  width: 20%;
`;

const TextFlex = styled.div`
  width: 80%;
`;

const FlexChild = styled.li`
  justify-content: center;
  width: 90%;
  flex: auto;
  display: flex;
  word-break: break-all;
  padding: 1rem;
  place-items: center;

  margin: 0 0 0.7em 0;

  color: ${({ theme }) => theme.navigator.colors.postsListItemLink};
  border-radius: 30px;
  background-color: ${({ theme }) => theme.search.colors.listBackground};

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 1.2s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    color: ${({ theme }) => theme.navigator.colors.postsListItemLinkHover};
    background-color: ${({ theme }) => theme.search.colors.hoverBackground};
  }

  h1 {
    margin: 0;
    font-weight: 700;
    font-size: 1.6em;
  }

  small {
    font-weight: 400;
    font-size: 1em;
  }

  @media (max-width: ${({ theme }) => theme.mediaQueryTresholds.L}px) {
    h1 {
      font-size: 1.3em;
    }

    small {
      font-size: 0.8em;
    }
  }

  @media (max-width: ${({ theme }) => theme.mediaQueryTresholds.M}px) {
    h1 {
      font-size: 1em;
    }

    small {
      font-size: 0.6em;
    }
  }

  @media (min-width: ${({ theme }) => theme.mediaQueryTresholds.L}px) {
    .moving-featured &,
    .is-aside & {
      padding: 0.7rem 0.5rem 0.5rem 0.5rem;

      h1 {
        font-size: 1em;
      }

      small {
        display: none;
      }
    }
  }
`;
