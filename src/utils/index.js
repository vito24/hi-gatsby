/**
 * 判断当前语言
 * 以`-cn`结尾的是中文
 * @param pathname
 * @returns {boolean}
 */
export function isZhCN(pathname) {
  return /-cn\/?$/.test(pathname);
}

/**
 * 获取当前语言下的跳转路径
 * @param pathname
 * @param zhCN
 * @returns {*}
 */
export function getLocalizedPathname(pathname, zhCN) {
  if (zhCN) {
    return pathname.replace(/\s+|index-cn\//, '');
  } else {
    return `${pathname}index-cn/`;
  }
}
