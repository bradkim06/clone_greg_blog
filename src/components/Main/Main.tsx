import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import Scroll from '../Scroll';

const StyleMain = styled.main`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  animation-name: main-entry;
  animation-duration: 0.5s;

  @media print {
    position: relative;

    & > div {
      overflow: visible !important;
    }

    & > div > div {
      position: relative !important;
    }
  }

  @keyframes main-entry {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${props => {
    const { minWidth, info, bars } = props.theme;
    return css`
      @media ${minWidth.L} {
        width: calc(100vw - ${info.sizes.width}px - ${bars.sizes.actionsBar}px);
        left: ${info.sizes.width}px;
      }
    `;
  }}
`;

type MainProps = {
  children: React.ReactNode;
};

function Main({ children }: MainProps): ReactElement {
  return (
    <StyleMain>
      <Scroll isPost>{children}</Scroll>
    </StyleMain>
  );
}

export default Main;
