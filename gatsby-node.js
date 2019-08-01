/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [fields___slug] }) {
        edges {
          node {
            id
            excerpt
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) return Promise.reject(errors);
    const blogTemplate = path.resolve('src/templates/blog.js');
    const docsTemplate = path.resolve('src/templates/docs.js');
    console.log('******result.data*******', result.data);

    const posts = result.data.allMarkdownRemark.edges;
    posts.forEach(({ node }, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path: node.fields.slug,
        component: blogTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
          previous,
          next
        }
      });
    });

    const docs = result.data.allMdx.edges;
    docs.forEach(({ node }, index) => {
      const previous = index === docs.length - 1 ? null : docs[index + 1].node;
      const next = index === 0 ? null : docs[index - 1].node;

      createPage({
        path: node.fields.slug,
        component: docsTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
          previous,
          next
        }
      });
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: `slug`,
      value: `/blog${slug}`
    });
  } else if (node.internal.type === 'Mdx') {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: `slug`,
      value: `/docs${slug}`
    });
  }
};
