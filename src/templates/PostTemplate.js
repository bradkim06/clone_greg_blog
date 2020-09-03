import React, { useEffect } from "react";
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

function PostTemplate({ data, navigatorPosition }) {
  const { mdx } = data;

  useEffect(() => {
    if (navigatorPosition === "is-featured") {
      moveNavigatorAside();
    }
  }, [moveNavigatorAside]);

  return (
    <Main>
      <Post post={mdx} />
    </Main>
  );
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

export const pageQuery = graphql`
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
  }
`;

PostTemplate.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(PostTemplate);
