import React, { useEffect, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { graphql } from 'gatsby';
import Seo from '../components/Seo';
import Post from '../components/Post';
import Main from '../components/Main';
import useSelector from '../state/selectors';
import { CurrentPostProps, setCurrentPost } from '../state/store';
import { moveNavAside } from '../utils/shared';

const PostTemplate = ({ data }: { data: CurrentPostProps }): ReactElement => {
  const navigatorPosition = useSelector(redux => redux.navigatorPosition);
  const dispatch = useDispatch();

  useEffect(() => {
    if (navigatorPosition === 'is-featured') {
      moveNavAside();
    }

    dispatch(setCurrentPost(data));
  }, [data]);

  return (
    <>
      <Seo post={data.mdx} />
      <Main>
        <Post post={data.mdx} />
      </Main>
    </>
  );
};

export const postQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      excerpt
      tableOfContents(maxDepth: 3)
      fields {
        slug
      }
      frontmatter {
        title
        subTitle
        date(formatString: "dddd, MMMM Do YYYY, h:m  A")
        cover {
          publicURL
          childImageSharp {
            fluid(srcSetBreakpoints: [50, 80, 100, 150]) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default PostTemplate;
