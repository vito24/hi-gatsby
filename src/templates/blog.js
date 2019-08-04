import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

import './index.less';

export default props => {
  const {
    data: { allMarkdownRemark, markdownRemark: post },
    pageContext: { previous, next },
    location
  } = props;

  return (
    <Layout sideData={allMarkdownRemark.edges} location={location}>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
