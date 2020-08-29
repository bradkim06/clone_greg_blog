import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setNavigatorPosition, setNavigatorShape } from "../state/store";
import { featureNavigator } from "../utils/shared";

class Home extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    navigatorPosition: PropTypes.string.isRequired,
    setNavigatorPosition: PropTypes.func.isRequired,
    isWideScreen: PropTypes.bool.isRequired,
  };

  featureNavigator = featureNavigator.bind(this);

  componentWillMount() {
    if (this.props.navigatorPosition !== "is-featured") {
      this.props.setNavigatorPosition("is-featured");
    }
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
    isWideScreen: state.isWideScreen,
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
