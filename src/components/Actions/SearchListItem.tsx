import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import { FluidObject } from "gatsby-image";
import { useLogoQuery } from "../Query/LogoQuery";
import Grow from "@material-ui/core/Grow";

type SearchResultProps = {
  title: string;
  subTitle?: string;
  excerpt: string;
  date?: string;
  slug: string;
  cover: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  linkOnClick: Function;
};

export default ({
  title,
  subTitle,
  excerpt,
  date,
  slug,
  cover,
  linkOnClick
}: SearchResultProps) => {
  const { logo } = useLogoQuery();

  const postTitle = JSON.stringify(title, null, 4).replace(/\"/g, "");
  const postSubTitle = JSON.stringify(subTitle, null, 4).replace(/\"/g, "");
  const postExcerpt =
    JSON.stringify(excerpt, null, 4).replace(/\"/g, "").substr(0, 30) + "...";
  const postDate = JSON.stringify(date, null, 4).replace(/\"/g, "");
  const postSlug = JSON.stringify(slug, null, 4).replace(/\"/g, "");

  function movePage() {
    linkOnClick();
  }

  return (
    <Grow in={true} timeout={1000}>
      <Link onClick={movePage} to={postSlug}>
        <FlexChild>
          {cover ? (
            <ImgSource src={cover.childImageSharp.fluid.src} alt={title} />
          ) : (
            <ImgSource src={logo.childImageSharp.fluid.src} alt={title} />
          )}
          <TextFlex>
            <h1>{postTitle}</h1>
            <Divider />
            <small>
              {postSubTitle === "null" ? postExcerpt : postSubTitle}
            </small>
            <Divider />
            <small>{postDate === "null" ? "" : postDate}</small>
          </TextFlex>
        </FlexChild>
      </Link>
    </Grow>
  );
};

// function myDate(date: string) {
//   const dateObj = new Date(date).toUTCString();
//   const dateToShow = dateObj.split(" ").slice(0, 4).join(" ");
//
//   if (dateToShow !== "Invalid Date") {
//     return dateToShow;
//   }
// }

const Divider = styled.div`
  aspect-ratio: 16/9;
  margin: 0.2rem 0;

  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    margin: 0.2rem 0;
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    margin: 0.2rem 0;

    .moving-featured &,
    .is-aside & {
      display: none;
    }
  }
`;

const ImgSource = styled.img`
  border-radius: 10px;
  width: 60px;
  height: 60px;

  @media (max-width: 300px) {
    display: none;
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    width: 80px;
    height: 80px;
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    width: 100%;
    height: 150px;

    .moving-featured &,
    .is-aside & {
      width: 30px;
      height: 30px;
    }
  }
`;

const TextFlex = styled.div`
  padding: 0 0 0 1rem;
  display: flex;
  flex-direction: column;

  h1 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }

  small {
    font-size: 0.8rem;
    font-weight: 400;
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    h1 {
      font-size: 1.2rem;
      font-weight: 600;
    }

    small {
      font-size: 0.9rem;
      font-weight: 400;
    }
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    padding: 0;

    h1 {
      margin: 0.5rem 0;
      font-size: 1.4rem;
      font-weight: 600;
    }

    small {
      font-size: 1rem;
      font-weight: 400;
    }

    .moving-featured &,
    .is-aside & {
      padding: 0 0 0 1rem;
      text-align: center;

      small {
        display: none;
      }

      h1 {
        font-size: 1rem;
      }
    }
  }
`;

const FlexChild = styled.li`
  padding: 0.7rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.navigator.colors.postsListItemLink};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.search.colors.listBackground};

  box-shadow: 0 1px 3px ${({ theme }) => theme.search.colors.shadow},
    0 1px 2px ${({ theme }) => theme.search.colors.shadowHover};
  transition: all 1.2s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 14px 28px ${({ theme }) => theme.search.colors.shadowHover},
      0 10px 10px ${({ theme }) => theme.search.colors.shadowHover};
    color: ${({ theme }) => theme.navigator.colors.postsListItemLinkHover};
    background-color: ${({ theme }) => theme.search.colors.hoverBackground};
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    padding: 1rem;
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    padding: 1rem;
    flex-direction: column;
    align-items: center;

    .moving-featured &,
    .is-aside & {
      padding: 0.5rem 1rem;
      flex-direction: row;
      align-items: center;
    }
  }
`;
