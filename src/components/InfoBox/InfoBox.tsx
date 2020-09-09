import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import InfoHeader from "./InfoHeader";
import InfoText from "./InfoText";
import InfoMenu from "./InfoMenu";

import {
  featureNavigatorFunc,
  moveNavigatorAsideFunc
} from "./../../utils/shared";
import { setNavigatorShape, ReduxState } from "../../state/store";

function InfoBox() {
  const state: any = useSelector<ReduxState>(
    state => ({
      navigatorShape: state.navigatorShape,
      navigatorPosition: state.navigatorPosition
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  function expandOnClick() {
    dispatch(setNavigatorShape("closed"));
  }

  function avatarOnClick(e: any) {
    featureNavigatorFunc(e, state, dispatch);
  }

  function menulinkOnClick(e: any) {
    moveNavigatorAsideFunc(e, state, dispatch);
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
}

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

export default InfoBox;
