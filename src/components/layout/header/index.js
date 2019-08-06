import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import * as utils from '../../../utils';

import './index.less';

class Header extends React.Component {
  render() {
    const { siteTitle, pathname } = this.props;
    const isBlog = pathname === '/' || pathname.startsWith('/blog');
    const isDocs = pathname.startsWith('/docs');

    const {
      intl: { locale }
    } = this.context;
    const isZhCN = locale === 'zh-CN';

    return (
      <header className="site-header">
        <div className="site-header-box">
          <Link to="/" className="site-header-title">
            {siteTitle}
          </Link>
          <nav className="site-header-nav">
            <ul>
              <li className={isBlog ? 'nav-item-active' : undefined}>
                <Link to="/">blog</Link>
              </li>
              <li className={isDocs ? 'nav-item-active' : undefined}>
                <Link to="/docs/">docs</Link>
              </li>
            </ul>
          </nav>
          {isDocs && (
            <nav className="site-header-actions">
              <ul>
                <li>
                  <Link to={utils.getLocalizedPathname(pathname, isZhCN)}>
                    <FormattedMessage id="app.header.lang" />
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    );
  }
}

Header.contextTypes = {
  intl: PropTypes.object.isRequired
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ''
};

export default Header;
