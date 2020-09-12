const config = require("./content/meta/config");

module.exports = {
  siteMetadata: {
    title: "bradkim06",
    siteUrl: `https://bradkim06.github.io`
  },
  plugins: [
    "gatsby-plugin-top-layout",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts/`,
        name: "posts"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages/`,
        name: "pages"
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.manifestName,
        short_name: config.manifestShortName,
        start_url: config.manifestStartUrl,
        lang: config.manifestLang,
        icon: `static/icon.png`,
        // icon: `icon.svg`,
        cache_busting_mode: "none",
        background_color: config.manifestBackgroundColor,
        theme_color_in_head: false, // This will avoid adding theme-color meta tag.
        display: config.manifestDisplay,
        description: config.manifestDescription,
        crossOrigin: config.manifestCrossOrigin
      }
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        workboxConfig: {
          globPatterns: ["static/icon.png"]
        }
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Open Sans`,
            variants: [`300`, `400`, `600`]
          }
        ]
      }
    },
    `gatsby-plugin-preload-fonts`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Open Sans`,
            subsets: ["korean"]
          },
          {
            family: `IBM Plex Serif`,
            subsets: ["korean"]
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-material-ui",
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      }
    },
    // If you want to use styled components you should add the plugin here.
    // 'gatsby-plugin-styled-components',
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          `gatsby-plugin-sharp`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // maxWidth: 700,
              backgroundColor: "transparent"
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 2em`
            }
          },
          "gatsby-remark-grid-tables",
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://bradkim06.github.io",
        sitemap: "https://bradkim06.github.io/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }]
      }
    }
  ]
};
