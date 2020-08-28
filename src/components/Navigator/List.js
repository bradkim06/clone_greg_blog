import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import ListHeader from "./ListHeader";

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

class List extends React.Component {
  render() {
    return (
      <Posts>
        <Inner>
          Hello Inner!
          <ListHeader />
        </Inner>
      </Posts>
    );
  }
}

export default List;
