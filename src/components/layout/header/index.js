import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import './index.less';

const Header = ({ siteTitle, pathname }) => {
  console.log(555, pathname);
  const isBlog = !pathname || pathname.startsWith('/blog');
  const isDocs = pathname && pathname.startsWith('/docs');

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
              <Link to="/docs">docs</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ''
};

export default Header;
