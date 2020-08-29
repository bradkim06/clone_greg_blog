import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import InfoHeader from "./InfoHeader";
import InfoText from "./InfoText";
import InfoMenu from "./InfoMenu";

import { featureNavigator, moveNavigatorAside } from "./../../utils/shared";
import { setNavigatorPosition, setNavigatorShape } from "../../state/store";

class InfoBox extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    parts: PropTypes.array.isRequired,
    pages: PropTypes.array.isRequired,
    navigatorPosition: PropTypes.string.isRequired,
    navigatorShape: PropTypes.string.isRequired,
    isWideScreen: PropTypes.bool.isRequired,
    setNavigatorShape: PropTypes.func.isRequired,
  };

  avatarOnClick = featureNavigator.bind(this);
  menulinkOnClick = moveNavigatorAside.bind(this);

  expandOnClick = (e) => {
    this.props.setNavigatorShape("closed");
  };

  render() {
    const { parts, pages, navigatorPosition, navigatorShape } = this.props;

    return (
      <StyleInfoBox
        className={`${navigatorPosition ? navigatorPosition : ""} 
         ${navigatorShape ? navigatorShape : ""}`}
      >
        <InfoHeader
          avatarOnClick={this.avatarOnClick}
          expandOnClick={this.expandOnClick}
        />
        <InfoContent>
          <InfoText />
          <InfoMenu linkOnClick={this.menulinkOnClick} />
        </InfoContent>
      </StyleInfoBox>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
    navigatorShape: state.navigatorShape,
    isWideScreen: state.isWideScreen,
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape,
};

const StyleInfoBox = styled.aside`
  display: none;
  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.L}px) {
    display: block;
    color: ${(props) => props.theme.info.colors.text};
    background: ${(props) => props.theme.info.colors.background};
    position: absolute;
    left: 0;
    top: 0;
    width: ${(props) => props.theme.info.sizes.width}px;
    height: 100%;
    padding: 20px 40px;
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 20px;
      bottom: 20px;
      width: 1px;
      border-right: 1px solid ${(props) => props.theme.base.colors.lines};
    }
  }
`;
//test

const InfoContent = styled.div`
  position: absolute;
  top: ${(props) => props.theme.info.sizes.headerHeight}px;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 40px 0;
  will-change: opacity, bottom;
  transition: bottom 0.5s 0s;
  opacity: 1;
  transition-timing-function: ease;

  .is-aside.closed & {
    bottom: ${(props) => props.theme.navigator.sizes.closedHeight}px;
  }

  .is-aside.open & {
    display: none;
  }

  .moving-featured & {
    bottom: 0;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);
