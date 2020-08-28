import React from "react";
import styled from "@emotion/styled";
import InfoHeader from "./InfoHeader";
import InfoText from "./InfoText";
import InfoMenu from "./InfoMenu";

const StyleInfoBox = styled.aside`
  ${({ theme }) => ` 
  display: none;
  @media (min-width: ${theme.mediaQueryTresholds.L}px) {
    display: block;
    color: ${theme.info.colors.text};
    background: ${theme.info.colors.background};
    position: absolute;
left: 0;
    top: 0;
    width: ${theme.info.sizes.width}px;
    height: 100%;
    padding: 20px 40px;
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 20px;
      bottom: 20px;
      width: 1px;
      border-right: 1px solid ${theme.base.colors.lines};
    }
  }
  `}
`;
//test

const InfoContent = styled.div`
  ${({ theme }) => ` 
  position: absolute;
  top: ${theme.info.sizes.headerHeight}px;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 40px 0;
  will-change: opacity, bottom;
  transition: bottom .5s 0s;
  opacity: 1;
transition-timing-function: ease;
`}
`;

class InfoBox extends React.Component {
  render() {
    return (
      <StyleInfoBox>
        <InfoHeader />
        <InfoContent>
          <InfoText />
          <InfoMenu />
        </InfoContent>
      </StyleInfoBox>
    );
  }
}

export default InfoBox;
