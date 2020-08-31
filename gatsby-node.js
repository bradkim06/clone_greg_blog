const webpack = require("webpack");
//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);
const { store } = require(`./node_modules/gatsby/dist/redux`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    const separtorIndex = ~slug.indexOf("--") ? slug.indexOf("--") : 0;
    const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;
    createNodeField({
      node,
      name: `slug`,
      value: `${separtorIndex ? "/" : ""}${slug.substring(shortSlugStart)}`,
    });
    createNodeField({
      node,
      name: `prefix`,
      value: separtorIndex ? slug.substring(1, separtorIndex) : "",
    });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve("./src/templates/PostTemplate.js");
    const pageTemplate = path.resolve("./src/templates/PageTemplate.js");
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  id
                  body
                  fields {
                    slug
                    prefix
                  }
                  slug
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(bradkim06);
          console.log(result.errors);
          reject(result.errors);
        }

        // Create posts and pages.
        _.each(result.data.allMdx.edges, (edge) => {
          const slug = edge.node.fields.slug;

          createPage({
            path: slug,
            component: postTemplate,
            context: {
              slug: slug,
            },
          });
        });
      })
    );
  });
};

// exports.onCreateWebpackConfig = ({ stage, actions }) => {
//   switch (stage) {
//     case "build-javascript": {
//       let components = store
//         .getState()
//         .pages.map((page) => page.componentChunkName);
//       components = _.uniq(components);
//       actions.setWebpackConfig({
//         plugins: [
//           webpack.optimize.CommonsChunkPlugin({
//             name: `commons`,
//             chunks: [`app`, ...components],
//             minChunks: (module, count) => {
//               const vendorModuleList = []; // [`material-ui`, `lodash`];
//               const isFramework = _.some(
//                 vendorModuleList.map((vendor) => {
//                   const regex = new RegExp(
//                     `[\\\\/]node_modules[\\\\/]${vendor}[\\\\/].*`,
//                     `i`
//                   );
//                   return regex.test(module.resource);
//                 })
//               );
//               return isFramework || count > 1;
//             },
//           }),
//         ],
//       });
//     }
//   }
// };

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: `@babel/plugin-syntax-dynamic-import`,
    name: `babel-plugin-dynamic-import-webpack`,
  });
};
