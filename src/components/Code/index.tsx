import React, { useState, ReactElement } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/oceanicNext';
import { darken } from 'polished';
import { mdx } from '@mdx-js/react';
import styled from 'styled-components';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { copyToClipboard } from './copy-to-clip';

const calculateLinesToHighlight = (meta: string) => {
  const RE = /{([\d,-]+)}/;

  if (!RE.test(meta)) {
    return () => false;
  }
  const lineNumbers = RE.exec(meta)[1]
    .split(',')
    .map(v => v.split('-').map(x => parseInt(x, 10)));
  return (index: number) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start,
    );
    return inRange;
  };
};

const Pre = styled.pre`
  text-align: left;
  margin: 0 0 16px 0;
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  padding: 2rem 1rem 1rem 1rem;
  overflow: auto;
  word-wrap: normal;
  border-radius: ${({ hasTitle }) => (hasTitle ? '0 0 3px 3px' : '3px')};
  webkit-overflow-scrolling: touch;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
    font-size: 1em;
  }
`;

const PreHeader = styled.div`
  background-color: ${darken('0.05', '#282a36')};
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

type CodeHighlightProps = {
  children: string;
  className: string;
  live?: string | boolean;
  title?: string;
  lineNumbers?: string;
  language?: Language;
  metastring?: string;
};

function CodeHighlight({
  children,
  className,
  live,
  title,
  lineNumbers,
  metastring = '',
}: CodeHighlightProps): ReactElement {
  const [copied, setCopied] = useState(false);
  const codeString = children.trim();
  const language = className.replace(/language-/, '');
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  if (live) {
    return (
      <LiveProvider
        code={codeString}
        noInline
        theme={theme}
        transformCode={code => `/** @jsx mdx */${code}`}
        scope={{ mdx }}
      >
        <LiveEditor />
        <LivePreview />
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
          {({
            className: blockClassName,
            style,
            tokens,
            getLineProps,
            getTokenProps,
          }) => (
            <Pre className={blockClassName} style={style} hasTitle={title}>
              <CopyCode onClick={handleClick}>
                {copied ? 'Copied!' : 'Copy'}
              </CopyCode>
              <code>
                {tokens.map((line, index) => {
                  const lineProps = getLineProps({ line, key: index });
                  if (shouldHighlightLine(index)) {
                    lineProps.className = `${lineProps.className} highlight-line`;
                  }
                  return (
                    <div key={lineProps.className} {...lineProps}>
                      {lineNumbers && <LineNo>{index + 1}</LineNo>}
                      {line.map((token, key) => (
                        <span
                          key={lineNumbers}
                          {...getTokenProps({ token, key })}
                        />
                      ))}
                    </div>
                  );
                })}
              </code>
            </Pre>
          )}
        </Highlight>
      </div>
    </>
  );
}

CodeHighlight.defaultProps = {
  live: false,
  title: null,
  lineNumbers: null,
  language: '',
  metastring: '',
};

type InlineCodeProps = {
  children: string;
};

export function InlineCode(props: InlineCodeProps): ReactElement {
  return <code className="inline-code" {...props} />;
}

export default CodeHighlight;
