import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import PostComments from "./PostComments";

const StyledPostFooter = styled.footer`
  color: ${(props) => props.theme.main.colors.footer};
  font-size: ${(props) => props.theme.main.fonts.footer.size}em;
  line-height: ${(props) => props.theme.main.fonts.footer.lineHeight};

  & p {
    margin: 0;
  }
`;

const PostFooter = () => {
  return (
    <StyledPostFooter>
      <PostComments />
    </StyledPostFooter>
  );
};

export default PostFooter;
