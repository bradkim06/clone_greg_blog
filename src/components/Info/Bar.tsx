import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "gatsby";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import TopMenu from "./TopMenu";
import { PagesProps } from "../Query/LayoutQuery";
import { useLogoQuery } from "../Query/LogoQuery";
import {
  moveNavFeature,
  moveNavAside,
  moveNavData
} from "./../../utils/shared";
import config from "../../../content/meta/config";
import loadable from "@loadable/component";

type InfoBarProps = {
  pages: PagesProps;
};

const InfoBar = ({ pages }: InfoBarProps) => {
  const state = moveNavData();
  const dispatch = useDispatch();

  const { logo } = useLogoQuery();

  function homeLinkOnClick(e: any) {
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
      <BarTitle>
        {config.infoTitle}
        <small>{config.infoTitleNote}</small>
      </BarTitle>
      <TopMenu
        pages={pages}
        homeLinkOnClick={homeLinkOnClick}
        pageLinkOnClick={pageLinkOnClick}
      />
    </InfoBarStyle>
  );
};

const InfoBarStyle = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  ${props => {
    const { bars, base, minWidth } = props.theme;
    return css`
      background: ${bars.colors.background};
      height: ${bars.sizes.infoBar}px;
      &::before {
        content: "";
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
  margin: 10px 0 0 15px;
  font-size: 1.1rem;

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

export default loadable(async () => InfoBar);
