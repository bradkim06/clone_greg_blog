import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { css } from "emotion";
import Link from "gatsby-link";
import theme from "../../styles/theme";

InfoMenu.propTypes = {
  linkOnClick: PropTypes.func.isRequired,
};

function InfoMenu({ linkOnClick }) {
  return (
    <StyleInfoMenu>
      <Link
        key="/about/"
        to="/about/"
        onClick={linkOnClick}
        className={link(theme)}
        data-shape="closed"
      >
        About
      </Link>
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

const link = (theme) => css`
  padding: 0.5em;
  font-weight: 300;
  text-transform: lowercase;
  color: ${theme.info.colors.menuLink};

  &:hover {
    color: ${theme.info.colors.menuLinkHover};
  }
`;

export default InfoMenu;
