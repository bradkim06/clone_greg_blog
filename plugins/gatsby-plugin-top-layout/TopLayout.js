import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useLayoutQuery } from "../../src/components/query/LayoutQuery";

import Navigator from "../../src/components/Navigator/Navigator";
import ActionsBar from "../../src/components/ActionsBar/ActionsBar";
import InfoBar from "../../src/components/InfoBox/InfoBar";
import InfoBox from "../../src/components/InfoBox";
import LayoutWrapper from "../../src/components/LayoutWrapper/";

import { setIsWideScreen } from "../../src/state/store";
import {
  useCurrentWitdh,
  isWideScreen as isWideScreenFunc,
} from "../../src/utils/helpers";

const propTypes = {
  posts: PropTypes.object.isRequired,
  pages: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  setIsWideScreen: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
};

function TopLayout(props) {
  const { posts, pages } = useLayoutQuery();
  const { children, setIsWideScreen, isWideScreen } = props;

  const categories = category(posts);
  let width = useCurrentWitdh();

  useEffect(() => {
    setIsWideScreen(isWideScreenFunc(width));
  });

  return (
    <React.Fragment>
      <LayoutWrapper>
        {children}
        <Navigator posts={posts} />
        <ActionsBar categories={categories} />
        <InfoBar />
        {isWideScreen && <InfoBox />}
      </LayoutWrapper>
    </React.Fragment>
  );
}

const category = (posts) => {
  let categories = (categories = posts.edges.reduce((list, edge) => {
    const category = edge.node.frontmatter.category;
    if (category && !~list.indexOf(category)) {
      return list.concat(edge.node.frontmatter.category);
    } else {
      return list;
    }
  }, []));
  return categories;
};

const mapStateToProps = (state) => {
  return {
    isWideScreen: state.isWideScreen,
  };
};

const mapDispatchToProps = {
  setIsWideScreen,
};

TopLayout.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(TopLayout);
