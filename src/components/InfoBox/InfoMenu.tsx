import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "gatsby";

InfoMenu.propTypes = {
  linkOnClick: PropTypes.func.isRequired
};

interface InfoMenuProps {
  linkOnClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

function InfoMenu({ linkOnClick }: InfoMenuProps) {
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

const StyleInfoMenu = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  margin: 0;
  width: 100%;
`;

const StyledLink = styled(Link)`
  padding: 0.5em;
  font-weight: 300;
  text-transform: lowercase;
  color: ${props => props.theme.info.colors.menuLink};

  &:hover {
    color: ${props => props.theme.info.colors.menuLinkHover};
  }
`;

export default InfoMenu;