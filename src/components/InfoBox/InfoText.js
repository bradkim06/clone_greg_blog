import React from "react";
import styled from "@emotion/styled";

export default function InfoHeader() {
  return (
    <Text>
      I am a front-end web developer. I used to be a web designer too, but now I
      concentrate on the code.
    </Text>
  );
}

const Text = styled.div`
  display: block;
  font-weight: 300;
  line-height: 1.5;
  font-size: 0.95em;
  text-align: left;
  margin-bottom: 0.8em;

  & p::first-of-type {
    margin-top: 0;
  }

  & p::last-child {
    margin-bottom: 0;
  }
`;
