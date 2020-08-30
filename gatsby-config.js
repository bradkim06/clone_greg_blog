module.exports = {
  siteMetadata: {
    title: "My page",
  },
  plugins: [
    "gatsby-plugin-top-layout",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts/`,
        name: "posts",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages/`,
        name: "pages",
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: "gatsby-plugin-material-ui",
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
    },
    // If you want to use styled components you should add the plugin here.
    // 'gatsby-plugin-styled-components',
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve(`./src/templates/PageTemplate`),
        },
        gatsbyRemarkPlugins: ["gatsby-remark-prismjs"],
      },
    },
  ],
};
