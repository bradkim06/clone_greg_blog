import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setNavigatorPosition, setNavigatorShape } from "../state/store";
import { moveNavigatorAside } from "../utils/shared";
import Main from "../components/Main/Main";
import PageHeader from "../components/Page/PageHeader";
import Article from "../components/Main/Article";
import Content from "../components/Main/Content";

class PageTemplate extends React.Component {
  moveNavigatorAside = moveNavigatorAside.bind(this);

  componentDidMount() {
    if (this.props.navigatorPosition === "is-featured") {
      this.moveNavigatorAside();
    }
  }

  render() {
    return (
      <Main>
        <Article>
          <PageHeader title="test" />
          <Content> {this.props.children} </Content>
        </Article>
      </Main>
    );
  }
}

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  setNavigatorPosition: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(PageTemplate);
