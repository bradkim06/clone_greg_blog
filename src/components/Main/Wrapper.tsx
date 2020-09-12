import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ReduxState } from "../../state/store";

export default ({ children }: { children: React.ReactNode }) => {
  const fontSizeState = useSelector<ReduxState, number>(
    state => state.fontSizeIncrease
  );

  return <StyleArticle fontSize={fontSizeState}>{children}</StyleArticle>;
};

const StyleArticle = styled.div<{ fontSize: number }>`
  font-size: calc(
    ${props => props.theme.main.fonts.content.size}em *
      ${props => props.fontSize}
  );

  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    font-size: calc(
      ${props => props.theme.main.fonts.content.sizeM}em *
        ${props => props.fontSize}
    );
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    font-size: calc(
      ${props => props.theme.main.fonts.content.sizeL}em *
        ${props => props.fontSize}
    );
  }
  background: ${props => props.theme.main.colors.background};
  max-width: ${props => props.theme.main.sizes.articleMaxWidth};
  margin: 0 auto;
  padding: calc(${props => props.theme.bars.sizes.infoBar}px + 1.5rem) 1.5rem
    1.5rem 1.5rem;
  & strong,
  & b {
    letter-spacing: -0.02em;
  }

  & a {
    font-weight: bold;
    letter-spacing: -0.02em;
    text-decoration: underline;
    transition: 0.3s;

    &:hover {
      color: ${props => props.theme.base.colors.linkHover};
    }
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    padding: calc(2.5rem + ${props => props.theme.bars.sizes.infoBar}px) 3.5rem
      2.5rem;
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    padding: 3.5rem;
  }
`;
