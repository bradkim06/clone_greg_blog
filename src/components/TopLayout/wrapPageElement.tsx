// eslint-disable jsx-props-no-spreading
import React from 'react';
import TopLayout from './index';

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
const wrapPageElement = ({ element }: any) => <TopLayout>{element}</TopLayout>;

export default wrapPageElement;
