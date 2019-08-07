import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/layout';
import * as utils from '../utils';

import './index.less';

export default props => {
  const {
    data: { site, allMdx, mdx: page },
    location
  } = props;

  const isZhCN = utils.isZhCN(location.pathname);

  const sideData = allMdx.edges.filter(mdx => {
    const {
      node: {
        fields: { slug }
      }
    } = mdx;

    return isZhCN ? slug.endsWith('/index-cn/') : !slug.endsWith('/index-cn/');
  });

  const curMdxIndex = sideData.findIndex(item => item.node.fields.slug === page.fields.slug);
  const previous = curMdxIndex === 0 ? null : sideData[curMdxIndex - 1].node;
  const next = curMdxIndex === sideData.length - 1 ? null : sideData[curMdxIndex + 1].node;

  return (
    <Layout site={site} sideData={sideData} location={location}>
      {/*<h1>{page.frontmatter.title}</h1>*/}
      <MDXRenderer slug={page.fields.slug}>{page.body}</MDXRenderer>
      <ul className="prev-next-wrapper">
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
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
    mdx(fields: { slug: { eq: $slug } }) {
      body
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
