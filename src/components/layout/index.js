/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { graphql } from 'gatsby';
import { IntlProvider, addLocaleData } from 'react-intl';
import Header from './header';
import Sidebar from './sidebar';
import * as utils from '../../utils';
import enLocale from './en-US';
import cnLocale from './zh-CN';

import './index.less';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object,
    site: PropTypes.object,
    sideData: PropTypes.array
  };

  static defaultProps = {
    site: {},
    sideData: []
  };

  constructor(props) {
    super(props);
    const { pathname } = props.location;
    const appLocale = utils.isZhCN(pathname) ? cnLocale : enLocale;
    addLocaleData(appLocale.data);

    this.state = {
      appLocale
    };
  }

  render() {
    const { appLocale } = this.state;
    const {
      children,
      site,
      sideData,
      location: { pathname }
    } = this.props;
    const isHome = pathname === '/';

    return (
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <div>
          <Header siteTitle={site.siteMetadata.title} pathname={pathname} />
          <div className="docs-content">
            {!isHome && <Sidebar data={sideData} pathname={pathname} />}
            <div className="docs-main">
              <main>{children}</main>
              <footer style={{ textAlign: 'center' }}>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.org">Gatsby</a>
              </footer>
            </div>
          </div>
        </div>
      </IntlProvider>
    );
  }
}

export default Layout;
