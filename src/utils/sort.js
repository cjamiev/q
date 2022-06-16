const alphaAscendingSort = (arr = []) => arr.sort();
const alphaDescendingSort = (arr = []) => arr.sort().reverse();

const numericAscendingSort = (arr = []) => arr.sort((a, b) => a - b);
const numericDescendingSort = (arr = []) => arr.sort((a, b) => b - a);

const sortByDelimiter = (content, delimiter = ' ') => content.split(delimiter).sort().join(delimiter);
const sortDescendingByDelimiter = (content, delimiter = ' ') => content.split(delimiter).sort().reverse().join(delimiter);

export {
  alphaAscendingSort,
  alphaDescendingSort,
  numericAscendingSort,
  numericDescendingSort,
  sortByDelimiter,
  sortDescendingByDelimiter
};
