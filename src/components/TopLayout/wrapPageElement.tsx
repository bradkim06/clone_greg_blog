import React, { ReactElement } from 'react';
import TopLayout from './index';

type PageElementProps = {
  element: React.ReactElement;
};

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
function wrapPageElement({ element }: PageElementProps): ReactElement {
  return <TopLayout>{element}</TopLayout>;
}

export default wrapPageElement;
