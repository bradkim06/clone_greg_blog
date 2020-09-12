import React from "react";
import Helmet from "react-helmet";
import config from "../../../content/meta/config";

type SeoProps = {
  data?: {
    body: string;
    fields: {
      slug: string;
      prefix: string;
    };
    frontmatter: {
      title: string;
      subTitle: string;
      // Todo
      // description: any;
      // cover: any;
    };
  };
};

export default ({ data }: SeoProps) => {
  const postTitle = ((data || {}).frontmatter || {}).title;
  const postDescription = ((data || {}).frontmatter || {}).description;
  const postCover = ((data || {}).frontmatter || {}).cover;
  const postSlug = ((data || {}).fields || {}).slug;

  const title = postTitle
    ? `${postTitle} - ${config.shortSiteTitle}`
    : config.siteTitle;
  const description = postDescription
    ? postDescription
    : config.siteDescription;
  const image = postCover
    ? postCover.childImageSharp.resize.src
    : config.siteImage;
  const url = config.siteUrl + config.pathPrefix + postSlug;

  return (
    <Helmet
      htmlAttributes={{
        lang: config.siteLanguage,
        prefix: "og: http://ogp.me/ns#"
      }}
    >
      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />
      {config.googleSiteVerification && (
        <meta
          name="google-site-verification"
          content={config.googleSiteVerification}
        />
      )}
    </Helmet>
  );
};
