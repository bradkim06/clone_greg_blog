import React from "react";
import styled from "@emotion/styled";
import { css } from "emotion";
import Link from "gatsby-link";
import theme from "../../styles/theme";

export default function InfoMenu() {
  return (
    <StyleInfoMenu>
      <Link className={link(theme)}>Hello InfoMenu Link!</Link>
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
