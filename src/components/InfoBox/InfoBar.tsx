import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "gatsby";
import styled from "styled-components";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { PagesProps } from "../query/LayoutQuery";
import avatar from "../../images/jpg/test.png";
import { ReduxState } from "../../state/store";
import {
  featureNavigatorFunc,
  moveNavigatorAsideFunc
} from "./../../utils/shared";
import config from "../../../content/meta/config";

type InfoBarProps = {
  pages: PagesProps;
};

function InfoBar({ pages }: InfoBarProps) {
  const state: any = useSelector<ReduxState>(
    state => ({
      navigatorShape: state.navigatorShape,
      navigatorPosition: state.navigatorPosition
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  function homeLinkOnClick(e: any) {
    featureNavigatorFunc(e, state, dispatch);
  }

  function pageLinkOnClick(e: any) {
    moveNavigatorAsideFunc(e, state, dispatch);
  }

  return (
    <InfoBarStyle>
      <AvatarLinkBar>
        <Link to="/" onClick={homeLinkOnClick} title="back to Home">
          <Avatar src={avatar} alt="infoBar avatar" />
        </Link>
      </AvatarLinkBar>
      <BarTitle>
        {config.infoTitle}
        <small>{config.infoTitleNote}</small>
      </BarTitle>
    </InfoBarStyle>
  );
}

const InfoBarStyle = styled.aside`
  position: absolute;
  background: ${props => props.theme.bars.colors.background};
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.theme.bars.sizes.infoBar}px;
  &::before {
    content: "";
    position: absolute;
    left: ${props => props.theme.base.sizes.linesMargin};
    right: ${props => props.theme.base.sizes.linesMargin};
    height: 0;
    bottom: 0;
    border-top: 1px solid ${props => props.theme.base.colors.lines};
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    display: none;
  }
`;

const AvatarLinkBar = styled.div`
  display: block;
  float: left;
  margin: 13px 0 0 30px;
`;

const BarTitle = styled.div`
  float: left;
  margin: 10px 0 0 15px;
  font-size: 1.1em;
  color: ${props => props.theme.bars.colors.text};

  & small {
    display: block;
    font-size: 0.65em;
    margin: 2px 0 0 0;
  }
`;

export default InfoBar;
