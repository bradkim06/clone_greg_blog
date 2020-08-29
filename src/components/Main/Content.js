import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { connect } from "react-redux";

import { setFontSizeIncrease } from "../../state/store";

const Content = (props) => {
  const { html, children } = props;

  if (html) {
    return <PageContent>html</PageContent>;
  } else {
    return <PageContent>{children}</PageContent>;
  }
};

const PageContent = styled.div`
  color: ${(props) => props.theme.main.colors.content};
  line-height: ${(props) => props.theme.main.fonts.content.lineHeight};
  & a {
    color: ${(props) => props.theme.base.colors.link};
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
    @media (min-width: ${(props) => props.theme.mediaQueryTresholds.M}px) {
      margin: 2.5em -3.5rem;
    }
  }
  & h2,
  & h3 {
    color: ${(props) => props.theme.main.colors.contentHeading};
    font-size: ${(props) => props.theme.main.fonts.contentHeading.h2Size}em;
    font-weight: ${(props) => props.theme.main.fonts.contentHeading.weight};
    line-height: ${(props) => props.theme.main.fonts.contentHeading.lineHeight};
    margin: 2em 0 1em;
    letter-spacing: -0.02em;
  }
  & h3 {
    font-size: ${(props) => props.theme.main.fonts.contentHeading.h3Size}em;
  }
  & p {
    margin: 0 0 1.5em 0;
    font-weight: 400;
  }
  & ul {
    list-style: circle;
    padding: 0 0 0 1.3em;
    @media (min-width: ${(props) => props.theme.mediaQueryTresholds.M}px) {
      padding: 0 0 0 2em;
    }
  }
  & li {
    margin: 0 0 0.5em 0;
  }
  & blockquote {
    border: 5px solid ${(props) => props.theme.main.colors.blockquoteFrame};
    font-style: italic;
    margin: 2.5em 0;
    padding: 1em 1.1em 1em 1.3em;
    position: relative;
    & p {
      margin: 0;
    }
    &::before,
    &::after {
      background: ${(props) => props.theme.main.colors.background};
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
  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.M}px) {
    font-size: ${(props) => props.theme.main.fonts.content.sizeM}em;
  }
  @media (min-width: ${(props) => props.theme.mediaQueryTresholds.L}px) {
    font-size: ${(props) => props.theme.main.fonts.content.sizeL}em;
  }
`;

const mapStateToProps = (state, ownProps) => {
  return {
    fontSizeIncrease: state.fontSizeIncrease,
  };
};

const mapDispatchToProps = {
  setFontSizeIncrease,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
