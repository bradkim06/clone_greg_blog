import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

const StyleInfoMenu = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  margin: 0;
  width: 100%;
`;

const StyledLink = styled(Link)`
  padding: 0.5rem;
  font-weight: 400;
  text-transform: lowercase;

  ${props => {
    const { info } = props.theme;
    return css`
      color: ${info.colors.menuLink};

      &:hover {
        color: ${info.colors.menuLinkHover};
      }
    `;
  }}
`;

type InfoMenuProps = {
  linkOnClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

function InfoMenu({ linkOnClick }: InfoMenuProps): ReactElement {
  return (
    <StyleInfoMenu>
      <StyledLink
        key="/about/"
        to="/about/"
        onClick={linkOnClick}
        data-shape="closed"
      >
        About
      </StyledLink>
    </StyleInfoMenu>
  );
}

export default InfoMenu;
