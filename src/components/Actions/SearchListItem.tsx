import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import Img from "gatsby-image";
import { useLogoQuery } from "../Query/LogoQuery";

type SearchResultProps = {
  title: string;
  subTitle?: string;
  excerpt: string;
  slug: string;
  cover: any;
  linkOnClick: Function;
};

export default ({
  title,
  subTitle,
  excerpt,
  slug,
  cover,
  linkOnClick
}: SearchResultProps) => {
  const { logo } = useLogoQuery();

  const titleName = JSON.stringify(title, null, 4).replace(/\"/g, "");
  const subTitleName = JSON.stringify(subTitle, null, 4).replace(/\"/g, "");
  const excerptData = JSON.stringify(excerpt, null, 4).replace(/\"/g, "");
  const path = JSON.stringify(slug, null, 4).replace(/\"/g, "");

  function movePage() {
    linkOnClick();
  }

  return (
    <Link onClick={movePage} to={path}>
      <FlexChild>
        {cover ? (
          <ImgSource sizes={cover.childImageSharp.sizes} alt={title} />
        ) : null}
        <TextFlex>
          <h1>{titleName}</h1>
          <Divider />
          <small>{subTitleName === "null" ? excerptData : subTitleName}</small>
        </TextFlex>
      </FlexChild>
    </Link>
  );
};

const Divider = styled.div`
  aspect-ratio: 16/9;
  margin: 0.2rem 0;
  .moving-featured &,
  .is-aside & {
    display: none;
  }
`;

const ImgSource = styled(Img)`
  border-radius: 10px;
  width: 80px;
  height: 80px;

  .moving-featured &,
  .is-aside & {
    width: 35px;
    height: 35px;
    margin-left: 1em;
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    width: 100px;
    height: 100px;
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    width: 100%;
    height: 100%;
    max-width: 250px;
    max-height: 250px;
  }
`;

const TextFlex = styled.div`
  padding: 0 1rem 1rem 1rem;
  display: flex;
  word-break: break-all;
  flex-direction: column;

  .moving-featured &,
  .is-aside & {
    padding: 0 0 0 1rem;
    text-align: center;
    small {
      display: none;
    }
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
  }
`;

const FlexChild = styled.li`
  padding: 1rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.navigator.colors.postsListItemLink};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.search.colors.listBackground};

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 1.2s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    color: ${({ theme }) => theme.navigator.colors.postsListItemLinkHover};
    background-color: ${({ theme }) => theme.search.colors.hoverBackground};
  }

  h1 {
    font-size: 1.3em;
    font-weight: 700;
  }

  small {
    font-size: 0.9em;
    font-weight: 400;
  }

  .moving-featured &,
  .is-aside & {
    padding: 0;
    flex-direction: row;
    align-items: center;
    // justify-content: center;
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    flex-direction: column;
    align-items: center;
  }
`;
