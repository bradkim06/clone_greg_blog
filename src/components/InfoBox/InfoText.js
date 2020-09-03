import React from "react";
import styled from "@emotion/styled";

export default function InfoHeader() {
  return <Text>software developer.</Text>;
}

const Text = styled.div`
  display: block;
  font-weight: 300;
  line-height: 1.5;
  font-size: 0.95em;
  text-align: center;
  margin-bottom: 0.8em;
  word-break: break-word;

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
