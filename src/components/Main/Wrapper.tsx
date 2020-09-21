import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../state/store';

const StyleArticle = styled.div<{ fontSize: number }>`
  margin: 0 auto;

  & strong,
  & b {
    letter-spacing: -0.02em;
  }

  ${props => {
    const { main, minWidth, base, bars } = props.theme;
    const { fontSize } = props;
    return css`
      font-size: calc(${main.fonts.content.size * fontSize}rem);

      @media ${minWidth.M} {
        font-size: calc(${main.fonts.content.sizeM * fontSize}rem);
      }

      @media ${minWidth.M} {
        font-size: calc(${main.fonts.content.sizeL * fontSize}rem);
      }

      background: ${main.colors.background};
      max-width: ${main.sizes.articleMaxWidth};
      padding: calc(${bars.sizes.infoBar}px + 1.5em) 1.5em;

      & a {
        font-weight: bold;
        letter-spacing: -0.02em;
        text-decoration: underline;
        transition: 0.3s;

        &:hover {
          color: ${base.colors.linkHover};
        }
      }

      @media ${minWidth.M} {
        padding: calc(2.5rem + ${bars.sizes.infoBar}px) 2.5em;
      }

      @media ${minWidth.L} {
        padding: 3.5rem 3.5em;
      }
    `;
  }}
`;

type PostWrapperProps = {
  children: React.ReactNode;
};

const PostWrapper = ({ children }: PostWrapperProps): ReactElement => {
  const fontSizeState = useSelector<ReduxState, number>(
    state => state.fontSizeIncrease,
  );

  return <StyleArticle fontSize={fontSizeState}>{children}</StyleArticle>;
};

export default PostWrapper;
