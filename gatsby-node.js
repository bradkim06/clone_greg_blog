// const webpack = require("webpack");
//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const _ = require("lodash");
// const Promise = require("bluebird");
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions;
//   if (node.internal.type === `Mdx`) {
//     const slug = createFilePath({ node, getNode, basePath: `pages` });
//     const separtorIndex = ~slug.indexOf("--") ? slug.indexOf("--") : 0;
//     const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;
//     createNodeField({
//       node,
//       name: `slug`,
//       value: `${separtorIndex ? "/" : ""}${slug.substring(shortSlugStart)}`
//     });
//     createNodeField({
//       node,
//       name: `prefix`,
//       value: separtorIndex ? slug.substring(1, separtorIndex) : ""
//     });
//   }
// };

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode });
    createNodeField({
      // Name of the field you are adding
      name: "slug",
      // Individual MDX node
      node,
      // Generated value based on filepath with "blog" prefix. you
      // don't need a separating "/" before the value because
      // createFilePath returns a path with the leading "/".
      value: `${value}`
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  // Create blog post pages.
  const posts = result.data.allMdx.edges;
  const postTemplate = path.resolve(`./src/templates/PostTemplate.tsx`);

  // you'll call `createPage` for each result
  posts.forEach(({ node }) => {
    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: postTemplate,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id }
    });
  });
  // Create posts and pages.
  // _.each(result.data.allMdx.edges, edge => {
  //   const slug = edge.node.fields.slug;
  //
  //   createPage({
  //     path: slug,
  //     component: postTemplate,
  //     context: {
  //       slug: slug
  //     }
  //   });
  // });
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

// exports.onCreateBabelConfig = ({ actions }) => {
//   actions.setBabelPlugin({
//     name: `@babel/plugin-syntax-dynamic-import`,
//     name: `babel-plugin-dynamic-import-webpack`
//   });
// };
