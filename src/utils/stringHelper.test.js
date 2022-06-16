import {
  reverseStringTestData,
  toDashCaseFromCamelCaseTestData,
  toCamelCaseFromDashCaseTestData,
  getEllipsisForLongTextTestData,
  lowerCaseFirstLetterTestData,
  capitalizeFirstLetterTestData
} from 'testHelper/testData/stringHelper-data';
import { testFunctionHelper } from 'testHelper';
import {
  reverseString,
  toDashCaseFromCamelCase,
  toCamelCaseFromDashCase,
  getEllipsisForLongText,
  lowerCaseFirstLetter,
  capitalizeFirstLetter
} from './stringHelper';

describe(':reverseString', () => {
  reverseStringTestData.forEach((data) => testFunctionHelper(data, reverseString));
});

describe(':toDashCaseFromCamelCase', () => {
  toDashCaseFromCamelCaseTestData.forEach((data) => testFunctionHelper(data, toDashCaseFromCamelCase));
});

describe(':toCamelCaseFromDashCase', () => {
  toCamelCaseFromDashCaseTestData.forEach((data) => testFunctionHelper(data, toCamelCaseFromDashCase));
});

describe(':getEllipsisForLongText', () => {
  getEllipsisForLongTextTestData.forEach((data) => testFunctionHelper(data, getEllipsisForLongText));
});

describe(':lowerCaseFirstLetter', () => {
  lowerCaseFirstLetterTestData.forEach((data) => testFunctionHelper(data, lowerCaseFirstLetter));
});

describe(':capitalizeFirstLetter', () => {
  capitalizeFirstLetterTestData.forEach((data) => testFunctionHelper(data, capitalizeFirstLetter));
});
