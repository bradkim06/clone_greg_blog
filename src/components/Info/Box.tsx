import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import InfoHeader from "./Header";
import InfoText from "./Text";
import InfoMenu from "./Menu";

import {
  moveNavFeature,
  moveNavAside,
  moveNavData
} from "./../../utils/shared";
import { setNavigatorShape } from "../../state/store";

export default () => {
  const state = moveNavData();
  const dispatch = useDispatch();

  function expandOnClick() {
    dispatch(setNavigatorShape("closed"));
  }

  function avatarOnClick(e: any) {
    moveNavFeature(e, state, dispatch);
  }

  function menulinkOnClick() {
    dispatch(setNavigatorShape("closed"));
    moveNavAside(state, dispatch);
  }

  return (
    <StyleInfoBox
      className={`${state.navigatorPosition ? state.navigatorPosition : ""} 
         ${state.navigatorShape ? state.navigatorShape : ""}`}
    >
      <InfoHeader avatarOnClick={avatarOnClick} expandOnClick={expandOnClick} />
      <InfoContent>
        <InfoText />
        <InfoMenu linkOnClick={menulinkOnClick} />
      </InfoContent>
    </StyleInfoBox>
  );
};

const StyleInfoBox = styled.aside`
  display: none;
  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    display: block;
    color: ${props => props.theme.info.colors.text};
    background: ${props => props.theme.info.colors.background};
    position: absolute;
    left: 0;
    top: 0;
    width: ${props => props.theme.info.sizes.width}px;
    height: 100%;
    padding: 20px 40px;
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 20px;
      bottom: 20px;
      width: 1px;
      border-right: 1px solid ${props => props.theme.base.colors.lines};
    }
  }
`;

const InfoContent = styled.div`
  position: absolute;
  top: ${props => props.theme.info.sizes.headerHeight}px;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 40px 0;
  will-change: opacity, bottom;
  transition: bottom 0.5s 0s;
  opacity: 1;
  transition-timing-function: ease;

  .is-aside.closed & {
    bottom: ${props => props.theme.navigator.sizes.closedHeight}px;
  }

  .moving-featured & {
    bottom: 0;
  }

  .is-aside.open & {
    display: none;
  }
`;