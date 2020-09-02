import React from "react";
import styled from "@emotion/styled";
import Link from "gatsby-link";

export default function InfoHeader() {
  return (
    <Text>
      I'm software developer. This blog is part of my private study. this blog
      code is open on my github.
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

  // .is-aside.open & {
  //   display: none;
  // }
`;
