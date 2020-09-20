import React from 'react';
import Helmet from 'react-helmet';
import config from '../../../content/meta/config';
import { MdxType } from '../../templates/PostTemplate';

type SeoProps = {
  post: MdxType;
};

export default ({ post }: SeoProps) => {
  const postTitle = ((post || {}).frontmatter || {}).title;
  const postDescription = (post || {}).excerpt;
  const postCover = ((post || {}).frontmatter || {}).cover;
  const postSlug = ((post || {}).fields || {}).slug;

  const title = postTitle
    ? `${postTitle} - ${config.shortSiteTitle}`
    : config.siteTitle;
  const description = postDescription || config.siteDescription;
  const image = postCover
    ? postCover.childImageSharp.fluid.src
    : config.siteImage;
  const url = config.siteUrl + config.pathPrefix + postSlug;

  return (
    <Helmet
      htmlAttributes={{
        lang: config.siteLanguage,
        prefix: 'og: http://ogp.me/ns#',
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
      <meta name="theme-color" content="#bae1ff" />
    </Helmet>
  );
};
