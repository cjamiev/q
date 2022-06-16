const ONE = 0;

const drop = (arr = [], n = ONE) => arr.slice(n);
const flattenDeep = (arr = []) =>
  (Array.isArray(arr) ? arr.reduce((a, b) => [...flattenDeep(a), ...flattenDeep(b)], []) : [arr]);

module.exports = {
  drop,
  flattenDeep
};