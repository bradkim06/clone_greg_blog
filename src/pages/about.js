import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProTip from "../components/ProTip";
import Link from "../components/Link";
import Copyright from "../components/Copyright";

export default function About() {
  return (
    <React.Fragment>
      <Typography variant="h4" component="h1" gutterBottom>
        Gatsby v4-beta example
      </Typography>
      <Link to="/">Go to the main page</Link>
      <ProTip />
      <Copyright />
    </React.Fragment>
  );
}
