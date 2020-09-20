import React from 'react';
import styled, { css } from 'styled-components';

export default ({ children }: { children: React.ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  padding: 1px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  @media print {
    position: relative;
    overflow: visible;
  }

  ${props => {
    const { background } = props.theme.bars.colors;
    return css`
      background-color: ${background};
    `;
  }}
`;
