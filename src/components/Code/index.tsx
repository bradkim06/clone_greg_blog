import React, { useState } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/oceanicNext";
import { darken } from "polished";
import {
  LiveProvider,
  LiveEditor,
  LiveError as AuxLiveError,
  LivePreview as AuxLivePreview
} from "react-live";
import { mdx } from "@mdx-js/react";
import styled, { css } from "styled-components";

import { copyToClipboard } from "./copy-to-clip";

CodeHighlight.defaultProps = {
  live: false,
  title: null,
  lineNumbers: null
};

type CodeHighlightProps = {
  children: string;
  className: string;
  live: string | boolean;
  title: string;
  lineNumbers: string;
};

export default function CodeHighlight({
  children,
  className,
  live,
  title,
  lineNumbers
}: CodeHighlightProps) {
  const [copied, setCopied] = useState(false);
  const codeString = children.trim();
  const language = className.replace(/language-/, "");

  if (live) {
    return (
      <LiveProvider
        code={codeString}
        noInline
        theme={theme}
        transformCode={code => `/** @jsx mdx */${code}`}
        scope={{ mdx }}
      >
        <LiveWrapper>
          <StyledEditor>
            <LiveEditor />
          </StyledEditor>
          <LivePreview />
        </LiveWrapper>

        <LiveError />
      </LiveProvider>
    );
  }

  const handleClick = () => {
    setCopied(true);
    copyToClipboard(codeString);
  };

  return (
    <>
      {title && <PreHeader>{title}</PreHeader>}
      <div className="gatsby-highlight">
        <Highlight
          {...defaultProps}
          code={codeString}
          language={language}
          theme={theme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className} style={style} hasTitle={title}>
              <CopyCode onClick={handleClick}>
                {copied ? "Copied!" : "Copy"}
              </CopyCode>
              <code>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {lineNumbers && <LineNo>{i + 1}</LineNo>}
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </code>
            </Pre>
          )}
        </Highlight>
      </div>
    </>
  );
}

const Pre = styled.pre`
  text-align: left;
  margin: 0 0 16px 0;
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  padding: 2rem 1rem 1rem 1rem;
  overflow: auto;
  word-wrap: normal;
  border-radius: ${({ hasTitle }) => (hasTitle ? "0 0 3px 3px" : "3px")};
  webkit-overflow-scrolling: touch;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
    font-size: 1em;
  }
`;

const LiveWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  border-radius: 3px;
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  overflow: hidden;
  margin-bottom: 32px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const column = css`
  flex-basis: 50%;
  width: 50%;
  max-width: 50%;

  @media (max-width: 600px) {
    flex-basis: auto;
    width: 100%;
    max-width: 100%;
  }
`;

const StyledEditor = styled.div`
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
  font-variant: no-common-ligatures no-discretionary-ligatures
    no-historical-ligatures no-contextual;
  font-size: 16px;
  line-height: 1.3rem;
  height: 350px;
  max-height: 350px;
  overflow: auto;
  ${column};

  > div {
    height: 100%;
  }

  * > textarea:focus {
    outline: none;
  }

  .token {
    font-style: normal !important;
  }
`;

const LivePreview = styled(AuxLivePreview)`
  position: relative;
  padding: 0.5rem;
  background: white;
  color: black;
  height: auto;
  overflow: hidden;
  ${column};
`;

const LiveError = styled(AuxLiveError)`
  display: block;
  color: rgb(248, 248, 242);
  white-space: pre-wrap;
  text-align: left;
  font-size: 15px;
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
  font-variant: no-common-ligatures no-discretionary-ligatures
    no-historical-ligatures no-contextual;
  padding: 0.5rem;
  border-radius: 3px;
  background: rgb(255, 85, 85);
  margin-bottom: 32px;
`;

const PreHeader = styled.div`
  background-color: ${darken("0.05", "#282a36")};
  color: rgba(248, 248, 242, 0.75);
  font-size: 0.75em;
  margin-top: 0.5rem;
  padding: 0.8em 1rem;
  border-radius: 3px 3px 0 0;
`;

const LineNo = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.5;
  font-size: 1em;
`;

const CopyCode = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 0.25rem;
  border: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: rgb(248, 248, 242);
  border-radius: 4px;
  margin: 0.25em;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s;

  &:hover {
    box-shadow: rgba(46, 41, 51, 0.08) 0px 1px 2px,
      rgba(71, 63, 79, 0.08) 0px 2px 4px;
    opacity: 0.8;
  }
`;
