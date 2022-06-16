const reverseStringTestData = [
  {
    testMessage: 'no argument',
    args: [],
    expectedResult: ''
  },
  {
    testMessage: 'empty argument',
    args: [''],
    expectedResult: ''
  },
  {
    testMessage: 'single character',
    args: ['a'],
    expectedResult: 'a'
  },
  {
    testMessage: 'triple same character',
    args: ['aaa'],
    expectedResult: 'aaa'
  },
  {
    testMessage: 'triple character middle character different',
    args: ['aba'],
    expectedResult: 'aba'
  },
  {
    testMessage: 'all different character',
    args: ['abcdef'],
    expectedResult: 'fedcba'
  }
];

const toDashCaseFromCamelCaseTestData = [
  { testMessage: 'empty', args: [''], expectedResult: '' },
  { testMessage: 'numbers and symbol', args: ['a$$l3'], expectedResult: 'a$$l3' },
  { testMessage: 'css property with one dash', args: ['borderRadius'], expectedResult: 'border-radius' },
  { testMessage: 'css property with two dashes', args: ['borderRightRadius'], expectedResult: 'border-right-radius' }
];

const toCamelCaseFromDashCaseTestData = [
  { testMessage: 'empty', args: [''], expectedResult: '' },
  { testMessage: 'numbers and symbol', args: ['a$$l3'], expectedResult: 'a$$l3' },
  { testMessage: 'css property with one dash', args: ['border-radius'], expectedResult: 'borderRadius' },
  { testMessage: 'css property with two dashes', args: ['border-right-radius'], expectedResult: 'borderRightRadius' }
];

const getEllipsisForLongTextTestData = [
  { testMessage: 'empty', args: ['', 5], expectedResult: '' },
  { testMessage: 'max less than string', args: ['12345', 3], expectedResult: '123...' },
  { testMessage: 'max greater than string', args: ['12345', 8], expectedResult: '12345' }
];

const lowerCaseFirstLetterTestData = [
  { testMessage: 'empty', args: [''], expectedResult: '' },
  { testMessage: 'single lowercase', args: ['a'], expectedResult: 'a' },
  { testMessage: 'single uppercase', args: ['A'], expectedResult: 'a' },
  { testMessage: 'two letter lowercase', args: ['ab'], expectedResult: 'ab' },
  { testMessage: 'two letter mixedcase', args: ['aB'], expectedResult: 'aB' },
  { testMessage: 'two letter uppercase', args: ['AB'], expectedResult: 'aB' }
];

const capitalizeFirstLetterTestData = [
  { testMessage: 'empty', args: [''], expectedResult: '' },
  { testMessage: 'single lowercase', args: ['a'], expectedResult: 'A' },
  { testMessage: 'single uppercase', args: ['A'], expectedResult: 'A' },
  { testMessage: 'two letter lowercase', args: ['ab'], expectedResult: 'Ab' },
  { testMessage: 'two letter mixedcase', args: ['aB'], expectedResult: 'AB' },
  { testMessage: 'two letter uppercase', args: ['AB'], expectedResult: 'AB' }
];

export {
  reverseStringTestData,
  toDashCaseFromCamelCaseTestData,
  toCamelCaseFromDashCaseTestData,
  getEllipsisForLongTextTestData,
  lowerCaseFirstLetterTestData,
  capitalizeFirstLetterTestData
};