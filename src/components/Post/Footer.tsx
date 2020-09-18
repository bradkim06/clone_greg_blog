import React from "react";
import styled, { css } from "styled-components";
import PostComments from "./Comments";

export default () => {
  return (
    <StyledPostFooter>
      <PostComments />
    </StyledPostFooter>
  );
};

const StyledPostFooter = styled.footer`
  & p {
    margin: 0;
  }

  ${props => {
    const { main } = props.theme;
    return css`
      color: ${main.colors.footer};
      font-size: ${main.fonts.footer.size}em;
      line-height: ${main.fonts.footer.lineHeight};
    `;
  }}
`;
