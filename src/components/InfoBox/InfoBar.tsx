import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "gatsby";
import styled from "styled-components";
import { connect } from "react-redux";
import { PagesProps } from "../query/LayoutQuery";

import avatar from "../../images/jpg/test.png";
import { setNavigatorPosition, ReduxState } from "../../state/store";
import { featureNavigator, moveNavigatorAside } from "./../../utils/shared";

interface InfoBarProps {
  pages: PagesProps;
}

class InfoBar extends React.Component<InfoBarProps> {
  homeLinkOnClick = featureNavigator.bind(this);
  pageLinkOnClick = moveNavigatorAside.bind(this);

  render() {
    return (
      <InfoBarStyle>
        <AvatarLinkBar>
          <Link to="/" onClick={this.homeLinkOnClick} title="back to Home">
            <Avatar src={avatar} alt="infoBar avatar" />
          </Link>
        </AvatarLinkBar>
        <BarTitle>
          bradkim06 <small>Hello small Title!</small>
        </BarTitle>
      </InfoBarStyle>
    );
  }
}

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

const BarTitle = styled.div`
  float: left;
  margin: 10px 0 0 15px;
  font-size: 1.1em;
  color: ${props => props.theme.bars.colors.text};

  & small {
    display: block;
    font-size: 0.65em;
    margin: 2px 0 0 0;
  }
`;

const mapStateToProps = (state: ReduxState) => {
  return {
    navigatorPosition: state.navigatorPosition,
    navigatorShape: state.navigatorShape
  };
};

const mapDispatchToProps = {
  setNavigatorPosition
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoBar);