import React from "react";
import Layout from "../components/Layout/Layout";
import InfoBox from "../components/InfoBox/InfoBox";
import InfoBar from "../components/InfoBox/InfoBar";
import ActionsBar from "../components/ActionsBar/ActionsBar";

function Home() {
  return (
    <Layout>
      <ActionsBar />
      <InfoBar />
      <InfoBox />
      <h1> Hello Index!</h1>
    </Layout>
  );
}

export default Home;
