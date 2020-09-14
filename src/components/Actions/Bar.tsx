import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Search from "./Search";
import Toc from "./Toc";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness2 from "@material-ui/icons/Brightness2";

import {
  setScrollToTop,
  setFontSizeIncrease,
  setCategoryFilter,
  setThemeToggle,
  ReduxState
} from "../../state/store";
import { moveNavFeature, moveNavData } from "../../utils/shared";
import FontSetter from "./FontSetter";
import CategoryFilter from "./CategoryFilter";

export default ({ categories }: { categories: string[] }) => {
  const isThemeState = useSelector<ReduxState, boolean>(
    state => state.themeToggle
  );
  const state = moveNavData();
  const dispatch = useDispatch();

  function homeOnClick(e: any) {
    moveNavFeature(e, state, dispatch);
  }

  function arrowUpOnClick() {
    dispatch(setScrollToTop(true));
  }

  function fontSetterOnClick(val: number) {
    dispatch(setFontSizeIncrease(val));
  }

  function categoryFilterOnClick(val: string) {
    dispatch(setCategoryFilter(val));
  }

  function themeToggleClick() {
    dispatch(setThemeToggle());

    const theme = isThemeState ? "lightTheme" : "darkTheme";
    localStorage.setItem("theme", theme);
  }

  return (
    <StyleActionsBar>
      <Group>
        <StyledIconButton
          aria-label="Back to list"
          onClick={homeOnClick}
          title="Back to the list"
        >
          <HomeIcon />
        </StyledIconButton>
        <Search />
        {((state.isWideScreen && state.navigatorShape === "open") ||
          state.navigatorPosition !== "is-aside") && (
          <CategoryFilter
            categories={categories}
            filterCategory={categoryFilterOnClick}
          />
        )}
      </Group>
      <Group>
        {state.navigatorPosition === "is-aside" && (
          <React.Fragment>
            <Toc />
            <FontSetter increaseFont={fontSetterOnClick} />
          </React.Fragment>
        )}
        <StyledIconButton
          aria-label="Theme Toggle"
          onClick={themeToggleClick}
          title="Theme Change"
        >
          {isThemeState ? <WbSunnyIcon /> : <Brightness2 />}
        </StyledIconButton>
        <StyledIconButton
          aria-label="Back to top"
          onClick={arrowUpOnClick}
          title="Scroll to top"
        >
          <ArrowUpwardIcon />
        </StyledIconButton>
      </Group>
    </StyleActionsBar>
  );
};

const StyleActionsBar = styled.div`
  position: absolute;
  background: ${props => props.theme.bars.colors.background};
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  justify-content: space-between;
  height: ${props => props.theme.bars.sizes.actionsBar}px;
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    left: ${props => props.theme.base.sizes.linesMargin};
    right: ${props => props.theme.base.sizes.linesMargin};
    height: 0;
    top: 0;
    border-top: 1px solid ${props => props.theme.base.colors.lines};
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    padding: 0 calc(${props => props.theme.base.sizes.linesMargin} * 1.5);
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    flex-direction: column;
    top: 0;
    right: 0;
    left: auto;
    height: 100%;
    padding: ${props => props.theme.base.sizes.linesMargin} 0;
    width: ${props => props.theme.bars.sizes.actionsBar}px;

    &::before {
      top: ${props => props.theme.base.sizes.linesMargin};
      bottom: ${props => props.theme.base.sizes.linesMargin};
      left: 0;
      right: auto;
      width: 0;
      height: auto;
      border-left: 1px solid ${props => props.theme.base.colors.lines};
    }
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .MuiIconButton-root {
    color: ${props => props.theme.bars.colors.icon};
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    flex-direction: column;
  }
`;

const StyledIconButton = styled(IconButton)``;
