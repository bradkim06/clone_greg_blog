import React from 'react';
import styled, { css } from 'styled-components';

type PostHeaderProps = {
  title: string;
  subTitle: string;
  date: string;
};

export default ({ title, subTitle, date }: PostHeaderProps) => {
  return (
    <PostHead>
      <PostTitle>{title}</PostTitle>
      <PostSubTitle>{subTitle}</PostSubTitle>
      <PostDate>{date}</PostDate>
    </PostHead>
  );
};

const PostHead = styled.div`
  margin: 0 0 3em;
`;

const PostTitle = styled.h1`
  letter-spacing: -0.04em;

  ${props => {
    const { main, minWidth } = props.theme;
    return css`
      color: ${main.colors.title};
      font-size: ${main.fonts.title.size}em;
      font-weight: ${main.fonts.title.weight};
      line-height: ${main.fonts.title.lineHeight};
      margin: 0 0 0.4em;

      @media ${minWidth.M} {
        font-size: ${main.fonts.title.sizeM}em;
      }

      @media ${minWidth.L} {
        font-size: ${main.fonts.title.sizeL}em;
        letter-spacing: -0.05em;
      }
    `;
  }}
`;

const PostSubTitle = styled.h2`
  ${props => {
    const { main, minWidth } = props.theme;
    return css`
      color: ${main.colors.subTitle};
      font-size: ${main.fonts.subTitle.size}em;
      line-height: ${main.fonts.subTitle.lineHeight};
      font-weight: ${main.fonts.subTitle.weight};

      @media ${minWidth.M} {
        font-size: ${main.fonts.subTitle.sizeM}em;
      }

      @media ${minWidth.L} {
        font-size: ${main.fonts.subTitle.sizeL}em;
      }
    `;
  }}
`;

const PostDate = styled.time`
  ${props => {
    const { main } = props.theme;
    return css`
      font-size: ${main.fonts.meta.size}em;
      font-weight: ${main.fonts.meta.weight};
      color: ${main.colors.meta};
    `;
  }}
`;
