import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';

const GridWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-gap: 1rem;

  ${props => {
    const { minWidth } = props.theme;
    return css`
      @media ${minWidth.L} {
        padding: 0 1rem;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

        .moving-featured &,
        .is-aside & {
          padding: 0 0.5rem;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }

        .is-aside.closed &,
        .moving-featured.closed & {
          display: none;
        }
      }
    `;
  }}
`;

type GrowListProps = {
  children: React.ReactNode;
};

function GrowList({ children }: GrowListProps): ReactElement {
  return <GridWrapper>{children}</GridWrapper>;
}

export default GrowList;
