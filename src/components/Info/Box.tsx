import React from "react";
import styled, { css } from "styled-components";
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

  ${props => {
    const { info, base, minWidth } = props.theme;
    return css`
      @media ${minWidth.L} {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        padding: 20px 40px;

        color: ${info.colors.text};
        background: ${info.colors.background};
        width: ${info.size.width};

        &::after {
          content: "";
          position: absolute;
          right: 0;
          top: 20px;
          bottom: 20px;
          width: 1px;
          border-right: 1px solid ${base.colors.lines};
        }
      }
    `;
  }}
`;

const InfoContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 40px 0;
  will-change: opacity, bottom;
  transition: bottom 0.5s 0s;
  opacity: 1;
  transition-timing-function: ease;

  .moving-featured & {
    bottom: 0;
  }

  .is-aside.open & {
    display: none;
  }

  ${props => {
    const { info, navigator } = props.theme;
    return css`
      top: ${info.size.headerHeight};

      .is-aside.closed & {
        bottom: ${navigator.size.closedHeight};
      }
    `;
  }}
`;
