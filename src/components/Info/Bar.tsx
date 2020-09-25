import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import loadable from '@loadable/component';
import TopMenu from './TopMenu';
import { PagesProps } from '../Query/LayoutQuery';
import { useLogoQuery } from '../Query/LogoQuery';
import { moveNavFeature, moveNavAside, moveNavData } from '../../utils/shared';
import config from '../../../content/meta/config';

const InfoBarStyle = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  ${props => {
    const { info, bars, base, minWidth } = props.theme;
    return css`
      color: ${info.colors.text};
      background: ${bars.colors.background};
      height: ${bars.sizes.infoBar}px;
      &::before {
        content: '';
        position: absolute;
        left: ${base.sizes.linesMargin};
        right: ${base.sizes.linesMargin};
        height: 0;
        bottom: 0;
        border-top: 1px solid ${base.colors.lines};
      }

      @media ${minWidth.L} {
        display: none;
      }
    `;
  }}
`;

const AvatarLinkBar = styled.div`
  display: block;
  float: left;
  margin: 13px 0 0 30px;
`;

const StyledAvatar = styled(Avatar)`
  width: 36px;
  height: 36px;
`;

const BarTitle = styled.div`
  float: left;
  margin: 15px 0 0 15px;
  font-size: 1.4rem;

  & small {
    display: block;
    font-size: 0.7rem;
    margin: 1px 0 0 0;
  }

  ${props => {
    const { bars } = props.theme;
    return css`
      color: ${bars.colors.text};
    `;
  }}
`;

type InfoBarProps = {
  pages: PagesProps;
};

const InfoBar = ({ pages }: InfoBarProps) => {
  const state = moveNavData();
  const dispatch = useDispatch();

  const { logo } = useLogoQuery();

  function homeLinkOnClick(e: React.MouseEvent<HTMLAnchorElement>) {
    moveNavFeature(e, state, dispatch);
  }

  function pageLinkOnClick() {
    moveNavAside(state, dispatch);
  }

  return (
    <InfoBarStyle>
      <AvatarLinkBar>
        <Link to="/" onClick={homeLinkOnClick} title="back to Home">
          <StyledAvatar src={logo.childImageSharp.fluid.src} alt="logo" />
        </Link>
      </AvatarLinkBar>
      <BarTitle>{config.infoTitle}</BarTitle>
      <TopMenu
        pages={pages}
        homeLinkOnClick={homeLinkOnClick}
        pageLinkOnClick={pageLinkOnClick}
      />
    </InfoBarStyle>
  );
};

export default loadable(async () => InfoBar);
