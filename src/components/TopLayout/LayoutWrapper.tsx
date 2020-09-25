import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';

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

type LayoutWrapperProps = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: LayoutWrapperProps): ReactElement => (
  <Wrapper>{children}</Wrapper>
);

export default LayoutWrapper;
