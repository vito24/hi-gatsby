/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './header';
import Sidebar from './sidebar';

import './index.less';

const Layout = ({ children, sideData, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  console.log('layout', location);

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata.title}
        pathname={location ? location.pathname : undefined}
      />
      <div className="docs-content">
        {location && <Sidebar data={sideData} pathname={location.pathname} />}
        <div className="docs-main">
          <main>{children}</main>
          <footer style={{ textAlign: 'center' }}>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object,
  sideData: PropTypes.array
};

Layout.defaultProps = {
  sideData: []
};

export default Layout;
