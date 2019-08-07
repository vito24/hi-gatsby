import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import classNames from 'classnames';

import './index.less';

class Sidebar extends Component {
  static contextTypes = {
    intl: PropTypes.object.isRequired
  };

  static propTypes = {
    data: PropTypes.array.isRequired,
    pathname: PropTypes.string.isRequired
  };

  render() {
    const { data, pathname } = this.props;
    const {
      intl: { locale }
    } = this.context;
    const isZhCN = locale === 'zh-CN';

    const menuTitle = pathname.startsWith('/blog') ? 'Blogs' : isZhCN ? '组件' : 'Components';

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
  }
}

export default Sidebar;
