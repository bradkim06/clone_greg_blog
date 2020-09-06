import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";

import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import avatar from "../../images/jpg/test.png";

function InfoHeader({ avatarOnClick, expandOnClick }) {
  return (
    <Header>
      <HeaderAvatarLink>
        <Link to="/" onClick={avatarOnClick} title="back to Home">
          <HeaderAvatar>
            <img src={avatar} alt="avatar" />
          </HeaderAvatar>
        </Link>
      </HeaderAvatarLink>
      <HeaderTitle>
        bradkim06
        <small>Personal Blog</small>
      </HeaderTitle>
      <IconButton
        aria-label="Expand the box"
        className="expand"
        onClick={expandOnClick}
        title="Expand the box"
      >
        <ExpandMoreIcon />
      </IconButton>
    </Header>
  );
}

const Header = styled.header`
  line-height: 1;
  position: relative;

  .expand {
    position: absolute;
    top: 30px;
    right: -25px;
    display: none;
    color: ${props => props.theme.info.colors.socialIcons};

    .is-aside.open & {
      display: block;
    }
  }
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
    transition: all 0.5s;
    transition-timing-function: ease;

    .navigator-in-transition-from.navigator-is-opened & {
      left: 50%;
    }

    .is-aside.open & {
      left: 8%;
      top: 0;
    }
  }
`;

const HeaderAvatar = styled.div`
  ${({ theme }) => ` 
    width: 36px;
    height: 36px;
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

    // @media (hover: hover) {
    //   &:hover {
    //     border-radius: 75% 65%;
    //   }
    // }
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

    .is-aside.open & {
      left: 60%;
      top: 0.15em;
      text-align: left;
    }
  }
`;

export default InfoHeader;
