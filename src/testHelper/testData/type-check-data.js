const isBooleanTestData = [
  {
    testMessage: 'no arguments',
    args: [],
    expectedResult: false
  },
  {
    testMessage: 'array',
    args: [[]],
    expectedResult: false
  },
  {
    testMessage: 'boolean true',
    args: [true],
    expectedResult: true
  },
  {
    testMessage: 'boolean false',
    args: [false],
    expectedResult: true
  },
  {
    testMessage: 'string',
    args: ['true'],
    expectedResult: false
  },
  {
    testMessage: 'number',
    args: [1],
    expectedResult: false
  },
  {
    testMessage: 'object',
    args: [{}],
    expectedResult: false
  }
];

const isJSONStringTestData = [
  {
    testMessage: 'no arguments',
    args: [],
    expectedResult: false
  },
  {
    testMessage: 'array',
    args: [[]],
    expectedResult: false
  },
  {
    testMessage: 'boolean',
    args: [true],
    expectedResult: false
  },
  {
    testMessage: 'object',
    args: [{}],
    expectedResult: false
  },
  {
    testMessage: 'NaN',
    args: [NaN],
    expectedResult: false
  },
  {
    testMessage: 'number',
    args: [1],
    expectedResult: false
  },
  {
    testMessage: 'string boolean',
    args: ['true'],
    expectedResult: true
  },
  {
    testMessage: 'string number',
    args: ['1'],
    expectedResult: true
  },
  {
    testMessage: 'string array',
    args: ['[]'],
    expectedResult: true
  },
  {
    testMessage: 'string object',
    args: ['{"one":1}'],
    expectedResult: true
  },
  {
    testMessage: 'string alphanumeric',
    args: ['1231kdjfad'],
    expectedResult: false
  }
];
const isNilTestData = [
  { testMessage: 'should be true for null', args: [null], expectedResult: true },
  { testMessage: 'should be true for undefined', args: [undefined], expectedResult: true },
  { testMessage: 'should be false for false', args: [false], expectedResult: false },
  { testMessage: 'should be false for 0', args: [0], expectedResult: false },
  { testMessage: 'should be false for \'\'', args: [''], expectedResult: false },
  { testMessage: 'should be false for {}', args: [{}], expectedResult: false },
  { testMessage: 'should be false for []', args: [[]], expectedResult: false }
];

const isNumberTestData = [
  {
    testMessage: 'no arguments',
    args: [],
    expectedResult: false
  },
  {
    testMessage: 'array',
    args: [[]],
    expectedResult: false
  },
  {
    testMessage: 'boolean',
    args: [true],
    expectedResult: false
  },
  {
    testMessage: 'string',
    args: ['true'],
    expectedResult: false
  },
  {
    testMessage: 'object',
    args: [{}],
    expectedResult: false
  },
  {
    testMessage: 'NaN',
    args: [NaN],
    expectedResult: false
  },
  {
    testMessage: 'number',
    args: [1],
    expectedResult: true
  }
];

const isObjectTestData = [
  {
    testMessage: 'no arguments',
    args: [],
    expectedResult: false
  },
  {
    testMessage: 'array',
    args: [[]],
    expectedResult: true
  },
  {
    testMessage: 'boolean',
    args: [true],
    expectedResult: false
  },
  {
    testMessage: 'number',
    args: [1],
    expectedResult: false
  },
  {
    testMessage: 'string',
    args: ['true'],
    expectedResult: false
  },
  {
    testMessage: 'object',
    args: [{}],
    expectedResult: true
  }
];

const isObjectLikeTestData = [
  { testMessage: 'should be false for null', args: [null], expectedResult: false },
  { testMessage: 'should be false for undefined', args: [undefined], expectedResult: false },
  { testMessage: 'should be false for false', args: [false], expectedResult: false },
  { testMessage: 'should be false for 0', args: [0], expectedResult: false },
  { testMessage: 'should be false for \'\'', args: [''], expectedResult: false },
  { testMessage: 'should be false for {}', args: [{}], expectedResult: true },
  { testMessage: 'should be false for []', args: [[]], expectedResult: true },
  { testMessage: 'should be false for []', args: [{ one: null }], expectedResult: true },
  { testMessage: 'should be false for []', args: [{ one: undefined }], expectedResult: true }
];

const isStringTestData = [
  {
    testMessage: 'no arguments',
    args: [],
    expectedResult: false
  },
  {
    testMessage: 'array',
    args: [[]],
    expectedResult: false
  },
  {
    testMessage: 'boolean',
    args: [true],
    expectedResult: false
  },
  {
    testMessage: 'object',
    args: [{}],
    expectedResult: false
  },
  {
    testMessage: 'NaN',
    args: [NaN],
    expectedResult: false
  },
  {
    testMessage: 'number',
    args: [1],
    expectedResult: false
  },
  {
    testMessage: 'string',
    args: ['true'],
    expectedResult: true
  }
];

export {
  isBooleanTestData,
  isJSONStringTestData,
  isNilTestData,
  isNumberTestData,
  isObjectTestData,
  isObjectLikeTestData,
  isStringTestData
};
