import React from "react";
import PropTypes from "prop-types";
import Main from "../components/Main/Main";
import Post from "../components/Post/Post";
import { connect } from "react-redux";
import { graphql } from "gatsby";

import { setNavigatorPosition, setNavigatorShape } from "../state/store";
import { moveNavigatorAside } from "../utils/shared";

require("prismjs/themes/prism-okaidia.css");

const propTypes = {
  data: PropTypes.object.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
};

class PostTemplate extends React.Component {
  moveNavigatorAside = moveNavigatorAside.bind(this);

  componentDidMount() {
    if (this.props.navigatorPosition === "is-featured") {
      this.moveNavigatorAside();
    }
  }

  render() {
    const { mdx } = this.props.data;
    return (
      <Main>
        <Post post={mdx} />
      </Main>
    );
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

export const postQuery = graphql`
  query BlogPostQuery($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
        prefix
      }
      frontmatter {
        title
        subTitle
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;

PostTemplate.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(PostTemplate);
