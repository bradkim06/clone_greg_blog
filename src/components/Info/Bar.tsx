import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "gatsby";
import styled from "styled-components";
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

type InfoBarProps = {
  pages: PagesProps;
};

export default ({ pages }: InfoBarProps) => {
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
  background: ${({ theme }) => theme.bars.colors.background};
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ theme }) => theme.bars.sizes.infoBar}px;
  &::before {
    content: "";
    position: absolute;
    left: ${({ theme }) => theme.base.sizes.linesMargin};
    right: ${({ theme }) => theme.base.sizes.linesMargin};
    height: 0;
    bottom: 0;
    border-top: 1px solid ${({ theme }) => theme.base.colors.lines};
  }

  @media (min-width: ${({ theme }) => theme.mediaQueryTresholds.L}px) {
    display: none;
  }
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
  font-size: 1.1em;
  color: ${({ theme }) => theme.bars.colors.text};

  & small {
    display: block;
    font-size: 0.65em;
    margin: 2px 0 0 0;
  }
`;
