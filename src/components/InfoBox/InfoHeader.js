import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import IconButton from "@material-ui/core/IconButton";
import styled from "@emotion/styled";

import avatar from "../../images/jpg/avatar.jpg";
const Header = styled.header`
  line-height: 1;
  position: relative;
`;

const HeaderAvatarLink = styled.div`
  will-change: left, top;
  float: left;
  display: block;
  position: relative;
  margin: 0 12px 0 0;

  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    margin: 0 20px 0 0;
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    position: absolute;
    top: 10px;
    left: 50%;
    margin-left: -30px;
    transition: all .5s;
    transition-timing-function: ease;
  }
`;

const HeaderAvatar = styled.div`
  ${({ theme }) => ` 
    width: 36px;
    height: 36px;
    border-radius: 65% 75%;
    border: 1px solid #ddd;
    transition: all .3s;
    transition-timing-function: ease;
    display: inline-block;
    overflow: hidden;
    & img{
      max-width: 100%;
    }
    @media (min-width: ${theme.mediaQueryTresholds.M}px) {
      width: 44px;
      height: 44px;
    }

    @media (min-width: ${theme.mediaQueryTresholds.L}px) {
      width: 60px;
      height: 60px;
    }

    @media (hover: hover) {
      &:hover {
        border-radius: 75% 65%;
      }
    }
  `}
`;

const HeaderTitle = styled.h1`
  will-change: transform, left, top;
  font-size: ${props => props.theme.info.fonts.boxTitleSize}em;
  margin: 0;
  float: left;
  transition-timing-function: ease;

  & small {
    display: block;
    font-size: 0.6em;
    margin-top: 0.3em;
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    font-size: ${props => props.theme.info.fonts.boxTitleSizeM}em;
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    font-size: ${props => props.theme.info.fonts.boxTitleSizeL}em;
    position: absolute;
    top: 85px;
    text-align: center;
    left: 50%;
    transform: translate(-50%);
    transition: all 0.5s;
  }
`;

export default function InfoHeader(props) {
  return (
    <Header>
      <HeaderAvatarLink>
        <Link to="/" title="back to Home">
          <HeaderAvatar>
            <img src={avatar} alt="" />
          </HeaderAvatar>
        </Link>
      </HeaderAvatarLink>
      <HeaderTitle>
        bradkim06
        <small>Personal Blog</small>
      </HeaderTitle>
    </Header>
  );
}
