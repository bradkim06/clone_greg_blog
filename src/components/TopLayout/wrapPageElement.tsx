import React, { ReactElement } from 'react';
import TopLayout from './index';

type PageElementProps = {
  element: React.ReactElement;
  props: unknown;
};

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
function wrapPageElement({ element, props }: PageElementProps): ReactElement {
  return <TopLayout {...props}>{element}</TopLayout>;
}

export default wrapPageElement;
