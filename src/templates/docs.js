import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/layout';

import './index.less';

export default props => {
  const {
    data: { mdx: page },
    pageContext: { previous, next }
  } = props;

  return (
    <Layout>
      <h1>{page.frontmatter.title}</h1>
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
