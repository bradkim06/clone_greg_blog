const lightColors = require("../../src/styles/lightColors");

module.exports = {
  siteTitle: "bradkim06", // <title>
  shortSiteTitle: "Personal Blog", // <title> ending for posts and pages
  siteDescription: "made with GatsbyJS",
  siteUrl: "https://bradkim06.github.io",
  pathPrefix: "",
  siteImage: "preview.jpg",
  siteLanguage: "en",
  // author
  authorName: "bradkim06",
  // info
  infoTitle: "bradkim06",
  infoTitleNote: "personal blog",
  infoText: "software developer",
  // manifest.json
  // PWA App Name
  manifestName: "bradkim06 blog",
  // max 12 characters, If name is too long to display, ShortName display instead of name
  manifestShortName: "bradkim06",
  manifestDescription:
    "manifest is part of the PWA specification, allows users to add your site to their home screen",
  // PWA App start url
  manifestStartUrl: "/",
  // App Background Color in using, loading state
  manifestBackgroundColor: lightColors.background,
  // UI[address, task switcher etc...] Color
  // manifestThemeColor: lightColors.accent,
  // option[browser, standalone, fullscreen]
  manifestDisplay: "standalone",
  manifestCrossOrigin: "anonymous",
  manifestLang: "en",
  // contact
  contactEmail: "bradkim06@gmail.com",
  // Google Search
  googleSiteVerification: "87GTb3Xk9fFlW-c1OLlIX3JinPcgE7GNTSbInlWdbB0"
};
