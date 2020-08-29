import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import ListHeader from "./ListHeader";
import { forceCheck } from "react-lazyload";
import SpringScrollbars from "../SpringScrollbars";

class List extends React.Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    linkOnClick: PropTypes.func.isRequired,
    expandOnClick: PropTypes.func.isRequired,
    navigatorPosition: PropTypes.string.isRequired,
    navigatorShape: PropTypes.string.isRequired,
    categoryFilter: PropTypes.string.isRequired,
    removeFilter: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.categoryFilter !== this.props.categoryFilter) {
      setTimeout(forceCheck, 300);
    }
  }

  render() {
    const {
      posts,
      linkOnClick,
      expandOnClick,
      categoryFilter,
      navigatorShape,
      removeFilter,
    } = this.props;

    return (
      <Posts>
        <SpringScrollbars forceCheckOnScroll={true} isNavigator={true}>
          <Inner>
            <ListHeader
              expandOnClick={expandOnClick}
              categoryFilter={categoryFilter}
              navigatorShape={navigatorShape}
              removeFilter={removeFilter}
            />
            <PostList>
              <li>testlist1</li>
              <li>testlist2</li>
            </PostList>
          </Inner>
        </SpringScrollbars>
      </Posts>
    );
  }
}

const Posts = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
`;

const Inner = styled.div`
  padding: calc(${(props) => props.theme.bars.sizes.infoBar}px + 1.3rem) 1.3rem
    calc(${(props) => props.theme.bars.sizes.actionsBar}px + 1.3rem) 1.3rem;

  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.M}px) {
    padding: calc(${(props) => props.theme.bars.sizes.infoBar}px + 2rem) 2rem
      calc(${(props) => props.theme.bars.sizes.actionsBar}px + 2rem) 2rem;
  }

  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.L}px) {
    padding: 2rem calc(1rem + 17px) calc(2rem + 17px) 2rem;
    left: ${(props) => props.theme.info.sizes.width}px;

    .moving-featured & .is-aside & {
      padding: 1rem 0.5rem 1rem 0.5rem;
    }
  }
`;

const PostList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  .is-aside.closed &,
  .moving-featured.closed & {
    display: none;
  }
`;

export default List;
