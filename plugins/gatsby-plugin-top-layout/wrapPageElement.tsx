import React from "react";
import TopLayout from "./TopLayout";

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
const wrapPageElement = ({ element, props }) => (
  <TopLayout {...props}>{element}</TopLayout>
);

export default wrapPageElement;
