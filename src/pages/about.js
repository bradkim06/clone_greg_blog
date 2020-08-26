import React from "react";
import Layout from "../components/Layout/Layout";
import InfoBox from "../components/InfoBox/InfoBox";
import InfoBar from "../components/InfoBox/InfoBar";
import ActionsBar from "../components/ActionsBar/ActionsBar";

import Typography from "@material-ui/core/Typography";
import ProTip from "../components/ProTip";
import Link from "../components/Link";
import Copyright from "../components/Copyright";

export default function About() {
  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Gatsby v4-beta example
      </Typography>
      <Link to="/">Go to the main page</Link>
      <ProTip />
      <Copyright />
      <ActionsBar />
      <InfoBar />
      <InfoBox />
    </Layout>
  );
}
