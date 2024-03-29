import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import Grow from '@material-ui/core/Grow';
import { useLogoQuery } from '../Query/LogoQuery';

const Divider = styled.div`
  margin: 0.1rem 0;

  ${props => {
    const { minWidth } = props.theme;
    return css`
      @media ${minWidth.L} {
        .moving-featured &,
        .is-aside & {
          display: none;
        }
      }
    `;
  }}
`;

const ImgSource = styled(Img)`
  border-radius: 20px;
  width: 80px;
  height: 80px;
  min-width: 80px;

  ${props => {
    const { minWidth, maxWidth } = props.theme;
    return css`
      @media ${maxWidth.S} {
        display: none;
      }

      @media ${minWidth.M} {
        width: 100px;
        min-width: 100px;
        height: 100px;
      }

      @media ${minWidth.L} {
        width: 100%;
        height: 150px;

        .moving-featured &,
        .is-aside & {
          width: 50px;
          min-width: 50px;
          height: 50px;
        }
      }
    `;
  }}
`;

const TextFlex = styled.div`
  padding: 0 0 0 1rem;
  display: flex;
  flex-direction: column;
  word-break: break-all;

  h1 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }

  small,
  time {
    font-size: 0.8rem;
    font-weight: 400;
  }

  ${props => {
    const { minWidth } = props.theme;
    return css`
      @media ${minWidth.M} {
        h1 {
          font-size: 1.2rem;
          font-weight: 600;
        }

        small,
        time {
          font-size: 0.9rem;
          font-weight: 400;
        }
      }

      @media ${minWidth.L} {
        word-break: break-word;
        padding: 0;

        h1 {
          margin: 0.5em 0;
          font-size: 1.4rem;
          font-weight: 600;
        }

        small,
        time {
          font-size: 1rem;
          font-weight: 400;
        }

        .moving-featured &,
        .is-aside & {
          padding: 0 0 0 0.5em;
          text-align: center;

          small,
          time {
            display: none;
          }

          h1 {
            font-size: 1rem;
          }
        }
      }
    `;
  }}
`;

const FlexWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const FlexLink = styled(Link)`
  padding: 0.7em;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-radius: 20px;

  position: relative;

  ${props => {
    const { navigator, search, minWidth } = props.theme;

    return css`
      color: ${navigator.colors.postsListItemLink};
      background-color: ${search.colors.listBackground};
      box-shadow: 0 1px 2px ${search.colors.shadow},
        0 2px 4px ${search.colors.shadow}, 0 4px 8px ${search.colors.shadow};
      transition: color 0.5s;

      &:hover {
        color: ${navigator.colors.postsListItemLinkHover};
      }

      &::before {
        content: ' ';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 20px;
        box-shadow: 0 10px 50px 0 ${search.colors.shadowHover};
        opacity: 0;
        transition: all 0.5s;
      }

      &:hover::before {
        opacity: 1;
      }

      @media ${minWidth.M} {
        padding: 1em 1rem;
      }

      @media ${minWidth.L} {
        padding: 1em 1rem;
        flex-direction: column;
        align-items: center;

        .moving-featured &,
        .is-aside & {
          padding: 0.5em 1rem;
          flex-direction: row;
          align-items: center;
        }
      }
    `;
  }}
`;

type SearchResultProps = {
  title: string;
  subTitle?: string;
  excerpt: string;
  date?: string;
  slug: string;
  cover?: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  linkOnClick: () => void;
};

const SearchListItem = ({
  title,
  subTitle,
  excerpt,
  date,
  slug,
  cover,
  linkOnClick,
}: SearchResultProps): ReactElement => {
  const { logo } = useLogoQuery();

  const postTitle = JSON.stringify(title, null, 4).replace(/"/g, '');
  const postSubTitle = JSON.stringify(subTitle, null, 4).replace(/"/g, '');
  const postExcerpt = `${JSON.stringify(excerpt, null, 4)
    .replace(/"/g, '')
    .substr(0, 30)}...`;
  const postDate = JSON.stringify(date, null, 4).replace(/"/g, '');
  const postSlug = JSON.stringify(slug, null, 4).replace(/"/g, '');

  function movePage() {
    linkOnClick();
  }

  return (
    <li key={postSlug}>
      <Grow in timeout="auto">
        <FlexWrapper>
          <FlexLink onClick={movePage} to={postSlug}>
            {cover ? (
              <ImgSource fluid={cover.childImageSharp.fluid} alt={title} />
            ) : (
              <ImgSource fluid={logo.childImageSharp.fluid} alt={title} />
            )}
            <TextFlex>
              <h1>{postTitle}</h1>
              <Divider />
              <small>
                {postSubTitle === 'null' ? postExcerpt : postSubTitle}
              </small>
              <Divider />
              <time>{postDate === 'null' ? '' : postDate}</time>
            </TextFlex>
          </FlexLink>
        </FlexWrapper>
      </Grow>
    </li>
  );
};

SearchListItem.defaultProps = {
  subTitle: '',
  date: '',
  cover: undefined,
};

export default SearchListItem;
