import React from "react";
import Main from "../components/Main/Main";
import Post from "../components/Post/Post";
import { connect } from "react-redux";
import { graphql } from "gatsby";
import Seo from "../components/seo/Seo";

import {
  setNavigatorPosition,
  setNavigatorShape,
  ReduxState
} from "../state/store";
import { moveNavigatorAside } from "../utils/shared";

require("prismjs/themes/prism-okaidia.css");

type PostTemplateProps = {
  data: {
    mdx: {
      id: string;
      body: string;
      fields: {
        slug: string;
        prefix: string;
      };
      frontmatter: {
        title: string;
        subTitle: string;
      };
    };
  };
  navigatorPosition: string;
  moveNavigatorAside: (e: any) => void;
};

class PostTemplate extends React.Component<PostTemplateProps> {
  moveNavigatorAside = moveNavigatorAside.bind(this);

  componentDidMount() {
    if (this.props.navigatorPosition === "is-featured") {
      this.moveNavigatorAside(null);
    }
  }

  render() {
    const { mdx } = this.props.data;
    return (
      <Main>
        <Seo data={mdx} />
        {this.props.children}
        <Post post={mdx} />
      </Main>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    navigatorPosition: state.navigatorPosition,
    isWideScreen: state.isWideScreen
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape
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
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(PostTemplate);
