const testArray = [1, 2, 3, 4, 5, 6];

const decrementElementIndexTestData = [
  {
    testMessage: 'empty arguments',
    args: [[], 0],
    expectedResult: []
  },
  {
    testMessage: 'index above bounds',
    args: [testArray, 6],
    expectedResult: testArray
  },
  {
    testMessage: 'index 0',
    args: [testArray, 0],
    expectedResult: testArray
  },
  {
    testMessage: 'index 1',
    args: [testArray, 1],
    expectedResult: [2, 1, 3, 4, 5, 6]
  }
];

const differenceTestData = [
  {
    testMessage: 'no arguments',
    args: [],
    expectedResult: []
  },
  {
    testMessage: 'empty arguments',
    args: [[], []],
    expectedResult: []
  },
  {
    testMessage: 'one item same arguments',
    args: [[1], [1]],
    expectedResult: []
  },
  {
    testMessage: 'three items same arguments',
    args: [[1, 2, 3], [1, 2, 3]],
    expectedResult: []
  },
  {
    testMessage: 'different arguments',
    args: [[1, 2, 3], [2]],
    expectedResult: [1, 3]
  }
];

const dropTestData = [
  {
    testMessage: 'no argument',
    args: [],
    expectedResult: []
  },
  {
    testMessage: 'empty argument',
    args: [[]],
    expectedResult: []
  },
  {
    testMessage: 'single item',
    args: [[1]],
    expectedResult: []
  },
  {
    testMessage: 'three items',
    args: [[1, 2, 3]],
    expectedResult: [2, 3]
  },
  {
    testMessage: 'three items and a second argument',
    args: [[1, 2, 3], 2],
    expectedResult: [3]
  },
  {
    testMessage: 'three items and a second argument exceeding length',
    args: [[1, 2, 3], 5],
    expectedResult: []
  }
];

const flattenTestData = [
  {
    testMessage: 'no argument',
    args: [],
    expectedResult: []
  },
  {
    testMessage: 'empty argument',
    args: [[]],
    expectedResult: []
  },
  {
    testMessage: 'single item',
    args: [[1]],
    expectedResult: [1]
  },
  {
    testMessage: 'three items',
    args: [[1, 2, 3]],
    expectedResult: [1, 2, 3]
  },
  {
    testMessage: 'nested item',
    args: [[1, [2], 3]],
    expectedResult: [1, 2, 3]
  },
  {
    testMessage: 'deeply nested item',
    args: [[1, [1, 2], [3]]],
    expectedResult: [1, 1, 2, 3]
  }
];

const flattenDeepTestData = [
  {
    testMessage: 'no argument',
    args: [],
    expectedResult: []
  },
  {
    testMessage: 'empty argument',
    args: [[]],
    expectedResult: []
  },
  {
    testMessage: 'single item',
    args: [[1]],
    expectedResult: [1]
  },
  {
    testMessage: 'three items',
    args: [[1, 2, 3]],
    expectedResult: [1, 2, 3]
  },
  {
    testMessage: 'nested item',
    args: [[1, [[2]], 3]],
    expectedResult: [1, 2, 3]
  },
  {
    testMessage: 'deeply nested item',
    args: [[1, [[1, [2]]], [3]]],
    expectedResult: [1, 1, 2, 3]
  }
];

const incrementElementIndexTestData = [
  {
    testMessage: 'empty arguments',
    args: [[], 0],
    expectedResult: []
  },
  {
    testMessage: 'index below bounds',
    args: [testArray, -1],
    expectedResult: testArray
  },
  {
    testMessage: 'index 5',
    args: [testArray, 5],
    expectedResult: testArray
  },
  {
    testMessage: 'index 1',
    args: [testArray, 0],
    expectedResult: [2, 1, 3, 4, 5, 6]
  }
];

const swapArrayElementPositionsTestData = [
  {
    testMessage: 'empty arguments',
    args: [[], []],
    expectedResult: []
  },
  {
    testMessage: 'first index below bounds',
    args: [testArray, -1, 0],
    expectedResult: testArray
  },
  {
    testMessage: 'second index below bounds',
    args: [testArray, 0, -1],
    expectedResult: testArray
  },
  {
    testMessage: 'first index above bounds',
    args: [testArray, 6, 0],
    expectedResult: testArray
  },
  {
    testMessage: 'second index above bounds',
    args: [testArray, 0, 6],
    expectedResult: testArray
  },
  {
    testMessage: 'swap element 1 and 2',
    args: [testArray, 1, 2],
    expectedResult: [1, 3, 2, 4, 5, 6]
  }
];

const unqiueTestData = [
  {
    testMessage: 'no argument',
    args: [],
    expectedResult: []
  },
  {
    testMessage: 'empty argument',
    args: [[]],
    expectedResult: []
  },
  {
    testMessage: 'single item',
    args: [[1]],
    expectedResult: [1]
  },
  {
    testMessage: 'three items',
    args: [[1, 2, 3]],
    expectedResult: [1, 2, 3]
  },
  {
    testMessage: 'three items all same',
    args: [[1, 1, 1]],
    expectedResult: [1]
  },
  {
    testMessage: 'four items with two same',
    args: [[1, 1, 2, 3]],
    expectedResult: [1, 2, 3]
  }
];

export {
  decrementElementIndexTestData,
  differenceTestData,
  dropTestData,
  flattenTestData,
  flattenDeepTestData,
  incrementElementIndexTestData,
  swapArrayElementPositionsTestData,
  unqiueTestData
};