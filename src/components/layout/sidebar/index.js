import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import classNames from 'classnames';

import './index.less';

const Sidebar = ({ data, pathname }) => {
  const menuTitle = pathname.startsWith('/blog') ? 'Blogs' : 'Components';

  return (
    <div className="docs-side">
      <h4 className="menu-title">{menuTitle}</h4>
      <ul>
        {data.map(mdx => {
          const {
            node: {
              fields: { slug },
              frontmatter: { title }
            }
          } = mdx;

          const menuItemClass = classNames('menu-item', {
            'menu-item-active': slug === pathname
          });

          return (
            <Link key={slug} to={slug}>
              <li className={menuItemClass}>{title}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  data: PropTypes.array.isRequired,
  pathname: PropTypes.string.isRequired
};

export default Sidebar;
