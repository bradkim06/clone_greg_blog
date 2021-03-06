import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2 from '@material-ui/icons/Brightness2';
import useSelector from '../../state/selectors';
import Search from './Search';
import Toc from './Toc';
import {
  setScrollToTop,
  setFontSizeIncrease,
  setCategoryFilter,
  setThemeToggle,
} from '../../state/store';
import { moveNavFeature } from '../../utils/shared';
import FontSetter from './FontSetter';
import CategoryFilter from './CategoryFilter';

const StyleActionsBar = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  justify-content: space-between;
  width: 100%;

  ${props => {
    const { bars, base, minWidth } = props.theme;
    return css`
      background: ${bars.colors.background};
      height: ${bars.sizes.actionsBar}px;

      &::before {
        content: '';
        position: absolute;
        left: ${base.sizes.linesMargin};
        right: ${base.sizes.linesMargin};
        height: 0;
        top: 0;
        border-top: 1px solid ${base.colors.lines};
      }

      @media ${minWidth.M} {
        padding: 0 calc(${base.sizes.linesMargin} * 1.5);
      }

      @media ${minWidth.L} {
        flex-direction: column;
        top: 0;
        right: 0;
        left: auto;
        height: 100%;
        padding: ${base.sizes.linesMargin} 0;
        width: ${bars.sizes.actionsBar}px;

        &::before {
          top: ${base.sizes.linesMargin};
          bottom: ${base.sizes.linesMargin};
          left: 0;
          right: auto;
          width: 0;
          height: auto;
          border-left: 1px solid ${base.colors.lines};
        }
      }
    `;
  }}
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${props => {
    const { bars, minWidth } = props.theme;
    return css`
      .MuiIconButton-root {
        color: ${bars.colors.icon};
      }

      @media ${minWidth.L} {
        flex-direction: column;
      }
    `;
  }}
`;

const StyledIconButton = styled(IconButton)``;

type ActionsBarProps = {
  categories: string[];
};

function ActionsBar({ categories }: ActionsBarProps): ReactElement {
  const state = useSelector(redux => ({
    themeToggle: redux.themeToggle,
    isWideScreen: redux.isWideScreen,
    navigatorShape: redux.navigatorShape,
    navigatorPosition: redux.navigatorPosition,
  }));
  const dispatch = useDispatch();

  function homeOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    moveNavFeature(e);
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

    const theme = state.themeToggle ? 'lightTheme' : 'darkTheme';
    localStorage.setItem('theme', theme);
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
        {((state.isWideScreen && state.navigatorShape === 'open') ||
          state.navigatorPosition !== 'is-aside') && (
          <CategoryFilter
            categories={categories}
            filterCategory={categoryFilterOnClick}
          />
        )}
      </Group>
      <Group>
        {state.navigatorPosition === 'is-aside' && (
          <>
            <Toc />
            <FontSetter increaseFont={fontSetterOnClick} />
          </>
        )}
        <StyledIconButton
          aria-label="Theme Toggle"
          onClick={themeToggleClick}
          title="Theme Change"
        >
          {state.themeToggle ? <WbSunnyIcon /> : <Brightness2 />}
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
}

export default ActionsBar;
