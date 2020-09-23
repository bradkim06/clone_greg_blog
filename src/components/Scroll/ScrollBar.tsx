import React, { ReactElement, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Scrollbar from 'react-scrollbars-custom';
import styled, { css } from 'styled-components';
import { ReduxState, setCurrentPost, setScrollToTop } from '../../state/store';

const RootScrollBar = styled(Scrollbar)`
  ${props => {
    const { bars } = props.theme;
    return css`
      .ScrollbarsCustom-Track {
        width: 5px !important;
        background-color: ${bars.colors.background} !important;
      }
      .ScrollbarsCustom-Thumb {
        background-color: ${bars.colors.icon} !important;
      }
    `;
  }}
`;

const Focus = styled.div`
  &:focus {
    outline: none;
  }
`;

type ScrollProps = {
  children: React.ReactNode;
  isPost?: boolean;
};

function ScrollBar({ children, isPost }: ScrollProps): ReactElement {
  const scrollToTop = useSelector<ReduxState, boolean>(
    state => state.scrollToTop,
  );
  const dispatch = useDispatch();
  const scrollbar = useRef(null);

  useEffect(() => {
    if (isPost && scrollToTop) {
      scrollbar.current.scrollToTop();
      dispatch(setScrollToTop(false));
    }
  }, [scrollToTop]);

  return (
    <RootScrollBar ref={scrollbar}>
      <Focus tabIndex={0}>{children}</Focus>
    </RootScrollBar>
  );
}

ScrollBar.defaultProps = {
  isPost: false,
};

export default ScrollBar;
