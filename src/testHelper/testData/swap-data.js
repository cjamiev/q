const decrementIndexTestData = [
  {
    testMessage: 'no argument',
    args: [, 0],
    expectedResult: []
  },
  {
    testMessage: 'empty argument',
    args: [[], 0],
    expectedResult: []
  },
  {
    testMessage: 'single item',
    args: [[1], 0],
    expectedResult: [1]
  },
  {
    testMessage: 'three items decrement first element',
    args: [[1, 2, 3], 0],
    expectedResult: [1, 2, 3]
  },
  {
    testMessage: 'three items decrement last element',
    args: [[1, 2, 3], 2],
    expectedResult: [1, 3, 2]
  }
];

const incrementIndexTestData = [
  {
    testMessage: 'no argument',
    args: [, 0],
    expectedResult: []
  },
  {
    testMessage: 'empty argument',
    args: [[], 0],
    expectedResult: []
  },
  {
    testMessage: 'single item',
    args: [[1], 0],
    expectedResult: [1]
  },
  {
    testMessage: 'three items increment last element',
    args: [[1, 2, 3], 2],
    expectedResult: [1, 2, 3]
  },
  {
    testMessage: 'three items increment first element ',
    args: [[1, 2, 3], 0],
    expectedResult: [2, 1, 3]
  }
];

const swapPositionsTestData = [
  {
    testMessage: 'no argument',
    args: [, 0, 0],
    expectedResult: []
  },
  {
    testMessage: 'empty argument',
    args: [[], 0, 0],
    expectedResult: []
  },
  {
    testMessage: 'single item',
    args: [[1], 0, 0],
    expectedResult: [1]
  },
  {
    testMessage: 'swap first and second',
    args: [[1, 2], 0, 1],
    expectedResult: [2, 1]
  },
  {
    testMessage: 'swap first and last',
    args: [[1, 2, 3], 0, 2],
    expectedResult: [3, 2, 1]
  },
  {
    testMessage: 'swap last and second',
    args: [[1, 2, 3], -1, 1],
    expectedResult: [1, 2, 3]
  },
  {
    testMessage: 'swap second and last',
    args: [[1, 2, 3], 1, -1],
    expectedResult: [1, 2, 3]
  }
];

export {
  decrementIndexTestData,
  incrementIndexTestData,
  swapPositionsTestData
};