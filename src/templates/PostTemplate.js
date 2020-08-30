import React from "react";
import PropTypes from "prop-types";
import Main from "../components/Main/Main";
import Post from "../components/Post/Post";
import { connect } from "react-redux";
import { graphql } from "gatsby";

import { setNavigatorPosition, setNavigatorShape } from "../state/store";
import { moveNavigatorAside } from "../utils/shared";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "gatsby";

const shortcodes = { Link }; // Provide common components here

class PostTemplate extends React.Component {
  moveNavigatorAside = moveNavigatorAside.bind(this);

  componentDidMount() {
    if (this.props.navigatorPosition === "is-featured") {
      this.moveNavigatorAside();
    }
  }

  render() {
    const mdx = this.props.data.mdx;
    return (
      <Main>
        <Post post={mdx} />
      </Main>
    );
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object.isRequired,
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

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
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
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(PostTemplate);
