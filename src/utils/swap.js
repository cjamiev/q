const ZERO = 0;
const ONE = 1;

const arrayIndexOutOfBounds = (length, index) => index < ZERO || index >= length;

const decrementIndex = (originalArray = [], index) => {
  return !arrayIndexOutOfBounds(originalArray.length, index)
    ? swapPositions(originalArray, index, index - ONE)
    : originalArray;
};

const incrementIndex = (originalArray = [], index) => {
  return !arrayIndexOutOfBounds(originalArray.length, index)
    ? swapPositions(originalArray, index, index + ONE)
    : originalArray;
};

const swapPositions = (originalArray = [], indexA, indexB) => {
  if (arrayIndexOutOfBounds(originalArray.length, indexA) || arrayIndexOutOfBounds(originalArray.length, indexB)) {
    return originalArray;
  }

  const newArray = originalArray.slice();
  const tempItem = originalArray[indexA];
  newArray[indexA] = originalArray[indexB];
  newArray[indexB] = tempItem;

  return newArray;
};

export {
  decrementIndex,
  incrementIndex,
  swapPositions
};
