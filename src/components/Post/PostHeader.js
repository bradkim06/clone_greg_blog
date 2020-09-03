import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  date: PropTypes.string.isRequired,
};

const PostHeader = ({ title, subTitle, date }) => {
  return (
    <PostHead>
      <PostTitle>{title}</PostTitle>
      <PostSubTitle>{subTitle}</PostSubTitle>
      <PostDate>{myDate(date)}</PostDate>
    </PostHead>
  );
};

function myDate(dateString) {
  const dateObj = new Date(dateString).toUTCString();
  const dateToShow = dateObj.split(" ").slice(0, 4).join(" ");

  if (dateToShow !== "Invalid Date") {
    return dateToShow;
  }
}

const PostHead = styled.div`
  margin: 0 0 3em;
`;

const PostTitle = styled.h1`
  color: ${(props) => props.theme.main.colors.title};
  font-size: ${(props) => props.theme.main.fonts.title.size}em;
  letter-spacing: -0.04em;
  font-weight: ${(props) => props.theme.main.fonts.title.weight};
  line-height: ${(props) => props.theme.main.fonts.title.lineHeight};
  margin: 0 0 0.4em;

  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.M}px) {
    font-size: ${(props) => props.theme.main.fonts.title.sizeM}em;
  }

  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.L}px) {
    font-size: ${(props) => props.theme.main.fonts.title.sizeL}em;
    letter-spacing: -0.05em;
  }
`;

const PostSubTitle = styled.h2`
  color: ${(props) => props.theme.main.colors.subTitle};
  font-size: ${(props) => props.theme.main.fonts.subTitle.size}em;
  line-height: ${(props) => props.theme.main.fonts.subTitle.lineHeight};
  font-weight: ${(props) => props.theme.main.fonts.subTitle.weight};

  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.M}px) {
    font-size: ${(props) => props.theme.main.fonts.subTitle.sizeM}em;
  }

  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.L}px) {
    font-size: ${(props) => props.theme.main.fonts.subTitle.sizeL}em;
  }
`;

const PostDate = styled.div`
  font-size: ${(props) => props.theme.main.fonts.meta.size}em;
  font-weight: ${(props) => props.theme.main.fonts.meta.weight};
  color: ${(props) => props.theme.main.colors.meta};
`;

PostHeader.propTypes = propTypes;
export default PostHeader;
