import React from "react";
import styled from "@emotion/styled";

const StyleHeader = styled.header`
  margin: 0 0 3em;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
`;

const PageHeaderTitle = styled.h1`
  color: ${(props) => props.theme.main.colors.title};
  font-size: ${(props) => props.theme.main.fonts.title.size}em;
  letter-spacing: -0.04em;
  font-weight: ${(props) => props.theme.main.fonts.title.weight};
  line-height: ${(props) => props.theme.main.fonts.title.lineHeight};
  margin: 0 0 0.4em;

  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.M}px) {
    font-size: ${(props) => props.theme.main.fonts.title.sizeM}em;
  }

  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.L}px) {
    font-size: ${(props) => props.theme.main.fonts.title.sizeL}em;
    letter-spacing: -0.05em;
  }
`;

export default function PageHeader(props) {
  const { title } = props;
  return (
    <StyleHeader>
      <PageHeaderTitle>{title}</PageHeaderTitle>
    </StyleHeader>
  );
}
