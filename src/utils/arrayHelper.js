const ONE = 1;

const swapArrayElementPositions = (ary, indexA, indexB) => {
  const itemA = ary[indexA];
  const itemB = ary[indexB];

  return ary.map((item, index) => {
    if (index === indexA && itemB) {
      return itemB;
    }
    else if (index === indexB && itemA) {
      return itemA;
    }
    return item;
  });
};

const decrementElementIndex = (ary, index) => swapArrayElementPositions(ary, index, index - ONE);

const incrementElementIndex = (ary, index) => swapArrayElementPositions(ary, index, index + ONE);

const difference = (arr1 = [], arr2 = []) => arr1.filter(item => !arr2.includes(item));

const drop = (arr = [], n = ONE) => arr.slice(n);

const flatten = (arr = []) => arr.reduce((accumulator, item) => accumulator.concat(item), []);
const flattenDeep = (arr = []) =>
  (Array.isArray(arr) ? arr.reduce((a, b) => [...flattenDeep(a), ...flattenDeep(b)], []) : [arr]);

const unique = (arr = []) => arr.filter((item, position) => arr.indexOf(item) === position);

export {
  decrementElementIndex,
  difference,
  drop,
  flatten,
  flattenDeep,
  incrementElementIndex,
  swapArrayElementPositions,
  unique
};
