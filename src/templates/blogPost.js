import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

import './index.less';

export default props => {
  const {
    data: { markdownRemark: post },
    pageContext: { previous, next }
  } = props;

  console.log(previous, next);

  return (
    <Layout>
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      frontmatter {
        title
      }
    }
  }
`;
