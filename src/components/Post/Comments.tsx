import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
import { ReduxState } from '../../state/store';

const PostComments = () => {
  const stateTheme = useSelector<ReduxState>(state => state.themeToggle);
  const themeSelect = stateTheme ? 'photon-dark' : 'github-light';

  useEffect(() => {
    const script = document.createElement('script');
    const anchor = document.getElementById('inject-comments-for-uterances');
    script.setAttribute('src', 'https://utteranc.es/client.js');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', 'true');
    script.setAttribute('repo', 'bradkim06/utterances');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', themeSelect);
    if ((anchor as any).hasChildNodes()) {
      (anchor as any).removeChild((anchor as any).firstChild);
    }
    (anchor as any).appendChild(script);
  }, [themeSelect]);

  return (
    <StyledComments>
      <section id="inject-comments-for-uterances" />
    </StyledComments>
  );
};

const StyledComments = styled.div`
  margin: 3em 0 0;
  padding: 3em 0 0;
`;

export default loadable(async () => PostComments);
