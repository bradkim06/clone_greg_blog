import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import config from '../../../content/meta/config';
import { useLogoQuery } from '../Query/LogoQuery';

type InfoHeaderProps = {
  avatarOnClick: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => void;
  expandOnClick: () => void;
};

export default ({ avatarOnClick, expandOnClick }: InfoHeaderProps) => {
  const infoTitle = config.infoTitle.replace(/ /g, '\u00a0');

  const { logo } = useLogoQuery();
  return (
    <Header>
      <HeaderAvatarLink>
        <Link to="/" onClick={avatarOnClick} title="back to Home">
          <HeaderAvatar>
            <img src={logo.childImageSharp.fluid.src} alt="avatar" />
          </HeaderAvatar>
        </Link>
      </HeaderAvatarLink>
      <HeaderTitle>
        {infoTitle}
        <small>{config.infoTitleNote}</small>
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
};

const Header = styled.header`
  ${props => {
    const { info } = props.theme;
    return css`
      line-height: 1;
      position: relative;

      .expand {
        position: absolute;
        top: 30px;
        right: -25px;
        display: none;
        color: ${info.colors.socialIcons};

        .is-aside.open & {
          display: block;
        }
      }
    `;
  }}
`;

const HeaderAvatarLink = styled.div`
  ${props => {
    const { minWidth } = props.theme;
    return css`
      will-change: left, top;
      float: left;
      display: block;
      position: relative;
      margin: 0 12px 0 0;

      @media ${minWidth.M} {
        margin: 0 20px 0 0;
      }

      @media ${minWidth.L} {
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
  }}
`;

const HeaderAvatar = styled.div`
  ${props => {
    const { minWidth } = props.theme;
    return css`
      width: 36px;
      height: 36px;
      transition: all 0.3s;
      transition-timing-function: ease;
      display: inline-block;
      overflow: hidden;
      & img {
        max-width: 100%;
      }
      @media ${minWidth.M} {
        width: 44px;
        height: 44px;
      }

      @media ${minWidth.L} {
        width: 60px;
        height: 60px;
      }
    `;
  }}
`;

const HeaderTitle = styled.h1`
  ${props => {
    const { info, minWidth } = props.theme;
    return css`
      will-change: transform, left, top;
      font-size: ${info.fonts.boxTitleSize}rem;
      margin: 0;
      float: left;
      transition-timing-function: ease;

      & small {
        display: block;
        font-size: 1.1rem;
        margin-top: 0.3rem;
      }

      @media ${minWidth.M} {
        font-size: ${info.fonts.boxTitleSizeM}rem;
      }

      @media ${minWidth.L} {
        font-size: ${info.fonts.boxTitleSizeL}rem;
        position: absolute;
        top: 85px;
        text-align: center;
        left: 50%;
        transform: translate(-50%);
        transition: all 0.5s;

        .is-aside.open & {
          left: 60%;
          top: 0.15rem;
          text-align: left;
        }
      }
    `;
  }}
`;
