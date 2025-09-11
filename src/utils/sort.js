const alphaAscendingSort = (arr = []) => arr.sort();
const alphaDescendingSort = (arr = []) => arr.sort().reverse();

const numericAscendingSort = (arr = []) => arr.sort((a, b) => a - b);
const numericDescendingSort = (arr = []) => arr.sort((a, b) => b - a);

export {
  alphaAscendingSort,
  alphaDescendingSort,
  numericAscendingSort,
  numericDescendingSort,
};
