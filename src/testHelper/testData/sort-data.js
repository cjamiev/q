const alphaAscendingSortTestData = [
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
    args: [['a']],
    expectedResult: ['a']
  },
  {
    testMessage: 'three items in descending order',
    args: [['c', 'b', 'a']],
    expectedResult: ['a', 'b', 'c']
  }
];

const alphaDescendingSortTestData = [
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
    args: [['a']],
    expectedResult: ['a']
  },
  {
    testMessage: 'three items in ascending order',
    args: [['a', 'b', 'c']],
    expectedResult: ['c', 'b', 'a']
  }
];

const numericAscendingSortTestData = [
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
    testMessage: 'three items in descending order',
    args: [[3, 2, 1]],
    expectedResult: [1, 2, 3]
  }
];

const numericDescendingSortTestData = [
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
    testMessage: 'three items in ascending order',
    args: [[1, 2, 3]],
    expectedResult: [3, 2, 1]
  }
];

const sortByDelimiterTestData = [
  { testMessage: 'by comma', args: ['d,c,b,a', ','], expectedResult: 'a,b,c,d' },
  { testMessage: 'by newline', args: ['d\nc\nb\na', '\n'], expectedResult: 'a\nb\nc\nd' }
];

export {
  alphaAscendingSortTestData,
  alphaDescendingSortTestData,
  numericAscendingSortTestData,
  numericDescendingSortTestData,
  sortByDelimiterTestData
};