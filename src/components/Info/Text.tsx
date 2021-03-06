import React, { ReactElement } from 'react';
import styled from 'styled-components';
import config from '../../../content/meta/config';

const Text = styled.div`
  display: block;
  font-weight: 300;
  line-height: 1.5;
  font-size: 0.95rem;
  text-align: center;
  margin-bottom: 0.8em;
  word-break: break-word;

  & p::first-of-type {
    margin-top: 0;
  }

  & p::last-child {
    margin-bottom: 0;
  }
`;

function InfoText(): ReactElement {
  return <Text>{config.infoText}</Text>;
}

export default InfoText;
