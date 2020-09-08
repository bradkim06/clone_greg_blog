import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

import { setFontSizeIncrease } from "../../state/store";

const propTypes = {
  children: PropTypes.node,
  setFontSizeIncrease: PropTypes.func.isRequired,
  fontSizeIncrease: PropTypes.number.isRequired
};

const Content = ({ children, fontSizeIncrease }) => {
  return <PageContent fontIncrease={fontSizeIncrease}>{children}</PageContent>;
};

const PageContent = styled.div`
  color: ${props => props.theme.main.colors.content};
  font-size: calc(
    ${props => props.theme.main.fonts.content.size}em *
      ${props => props.fontIncrease}
  );

  @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
    font-size: calc(
      ${props => props.theme.main.fonts.content.sizeM}em *
        ${props => props.fontIncrease}
    );
  }

  @media (min-width: ${props => props.theme.mediaQueryTresholds.L}px) {
    font-size: calc(
      ${props => props.theme.main.fonts.content.sizeL}em *
        ${props => props.fontIncrease}
    );
  }
  line-height: ${props => props.theme.main.fonts.content.lineHeight};

  & a {
    color: ${props => props.theme.base.colors.link};
  }

  & .gatsby-highlight {
    margin: 2em 0;
  }

  & .gatsby-resp-iframe-wrapper {
    margin: 2em 0;
  }

  & .gatsby-resp-image-link {
    margin: 2em -1.5rem;
    border: none;
    @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
      margin: 2.5em -3.5rem;
    }
  }

  & h1,
  & h2,
  & h3 {
    color: ${props => props.theme.main.colors.contentHeading};
    font-weight: ${props => props.theme.main.fonts.contentHeading.weight};
    line-height: ${props => props.theme.main.fonts.contentHeading.lineHeight};
    margin: 2em 0 1em;
    letter-spacing: -0.02em;
  }
  & h3 {
    font-size: ${props => props.theme.main.fonts.contentHeading.h3Size}em;
  }
  & p {
    margin: 0 0 1.5em 0;
    font-weight: 400;
  }
  & ul {
    list-style: circle;
    padding: 0 0 0 1.3em;
    @media (min-width: ${props => props.theme.mediaQueryTresholds.M}px) {
      padding: 0 0 0 2em;
    }
  }
  & li {
    margin: 0 0 0.5em 0;
  }
  & blockquote {
    border: 5px solid ${props => props.theme.main.colors.blockquoteFrame};
    font-style: italic;
    margin: 2.5em 0;
    padding: 1em 1.1em 1em 1.3em;
    position: relative;
    & p {
      margin: 0;
    }
    &::before,
    &::after {
      background: ${props => props.theme.main.colors.background};
      content: "";
      height: 5px;
      left: 50%;
      margin-left: -47%;
      position: absolute;
      top: -5px;
      width: 94%;
    }
    &::after {
      top: auto;
      bottom: -5px;
    }
  }

  & table {
    display: inline-block;
    overflow-x: auto;
    margin: 0.5em 0 2.5em;
    max-width: 100%;
    width: auto;
    border-spacing: 0;
    border-collapse: collapse;
    white-space: nowrap;
    vertical-align: top;
  }

  & table th {
    // color: ${props => props.theme.base.colors.text};
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.2px;
    text-align: left;
    text-transform: uppercase;
    background-color: ${props => props.theme.base.colors.lines};
  }

  & table th,
  & table td {
    padding: 6px 12px;
    border: 1px solid ${props => props.theme.base.colors.text};
  }
`;

const mapStateToProps = (state, ownProps) => {
  return {
    fontSizeIncrease: state.fontSizeIncrease
  };
};

const mapDispatchToProps = {
  setFontSizeIncrease
};

Content.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Content);
