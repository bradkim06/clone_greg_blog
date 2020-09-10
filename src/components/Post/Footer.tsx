import React from "react";
import styled from "styled-components";
import PostComments from "./Comments";

const PostFooter = () => {
  return (
    <StyledPostFooter>
      <PostComments />
    </StyledPostFooter>
  );
};

const StyledPostFooter = styled.footer`
  color: ${props => props.theme.main.colors.footer};
  font-size: ${props => props.theme.main.fonts.footer.size}em;
  line-height: ${props => props.theme.main.fonts.footer.lineHeight};

  & p {
    margin: 0;
  }
`;

export default PostFooter;
