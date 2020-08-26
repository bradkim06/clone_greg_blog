import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Link from "gatsby-link";
import styled from "@emotion/styled";

import avatar from "../../images/jpg/avatar.jpg";

const InfoBarStyle = styled.aside`
  position: absolute;
  background: ${props => props.theme.bars.colors.background};
top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.theme.bars.sizes.infoBar}px;
  &::before {
    content: "";
    position: absolute;
    left: ${props => props.theme.base.sizes.linesMargin};
    right: ${props => props.theme.base.sizes.linesMargin};
    height: 0;
    bottom: 0;
    border-top: 1px solid ${props => props.theme.base.colors.lines};
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    display: none;
  }
`;

const AvatarLinkBar = styled.div`
  display: block;
  float: left;
  margin: 13px 0 0 30px;
`;

const BarTitle = styled.h3`
  float: left;
  margin: 10px 0 0 15px;
  color: ${props => props.theme.bars.colors.text};
  & small {
    display: block;
    font-size: 0.65em;
    margin: 2px 0 0 0;
  }
`;

export default function InfoBar() {
  return (
    <InfoBarStyle>
      <AvatarLinkBar>
        <Link to="/" title="back to Home">
          <Avatar src={avatar} />
        </Link>
      </AvatarLinkBar>
      <BarTitle>
        bradkim06
        <small>Hello small Title!</small>
      </BarTitle>
    </InfoBarStyle>
  );
}
