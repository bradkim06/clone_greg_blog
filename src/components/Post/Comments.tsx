import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
import { ReduxState } from '../../state/store';

const StyledComments = styled.div`
  margin: 3em 0 0;
  padding: 3em 0 0;
`;

const PostComments = () => {
  const stateTheme = useSelector<ReduxState>(state => state.themeToggle);
  const themeSelect = stateTheme ? 'photon-dark' : 'github-light';

  useEffect(() => {
    const script = document.createElement('script');
    const anchor = document.getElementById('inject-comments-for-uterances');
    script.src = 'https://utteranc.es/client.js';
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.setAttribute('label', '💬');
    script.setAttribute('repo', 'bradkim06/utterances');
    script.setAttribute('issue-term', 'og:title');
    script.setAttribute('theme', themeSelect);
    if (anchor) {
      if (anchor.firstChild) {
        anchor.removeChild(anchor.firstChild);
      }
      anchor.appendChild(script);
    }
  }, [themeSelect]);

  return (
    <StyledComments>
      <section id="inject-comments-for-uterances" />
    </StyledComments>
  );
};

export default loadable(async () => PostComments);
