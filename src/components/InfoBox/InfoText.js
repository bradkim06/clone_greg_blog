import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";


const Text = styled.div`
  display: block;
  font-weight: 300;
  line-height: 1.5;
  font-size: .95em;
  text-align: left;
  margin-bottom: .8em;

  & p::first-child{
    margin-top: 0;
  }

  & p::last-child {
    margin-bottom: 0;
  }
`

export default function InfoHeader() {
  return(<Text>I am a front-end web developer. I used to be a web designer too, but now I concentrate on the code.</Text>);
}

