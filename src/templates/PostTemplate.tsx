import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { graphql } from 'gatsby';
import loadable from '@loadable/component';
import Seo from '../components/Seo';
import Post from '../components/Post';
import Main from '../components/Main';
import { CurrentPostProps, setCurrentPost } from '../state/store';
import { moveNavAside, moveNavData } from '../utils/shared';

const PostTemplate = ({ data }: { data: CurrentPostProps }) => {
  const state = moveNavData();
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.navigatorPosition === 'is-featured') {
      moveNavAside(state, dispatch);
    }

    dispatch(setCurrentPost(data));
  }, []);

  return (
    <Main>
      <Seo post={data.mdx} />
      <Post post={data.mdx} />
    </Main>
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
            fluid(quality: 100, srcSetBreakpoints: [30, 60, 80, 200]) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default loadable(async () => PostTemplate);
