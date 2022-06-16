import {
  isBooleanTestData,
  isJSONStringTestData,
  isNilTestData,
  isNumberTestData,
  isObjectTestData,
  isObjectLikeTestData,
  isStringTestData
} from 'testHelper/testData/type-check-data';
import { testFunctionHelper } from 'testHelper';
import { isBoolean, isJSONString, isNil, isNumber, isObject, isObjectLike, isString } from './type-check';

describe(':isBoolean', () => {
  isBooleanTestData.forEach((data) => testFunctionHelper(data, isBoolean));
});

describe(':isJSONString', () => {
  isJSONStringTestData.forEach((data) => testFunctionHelper(data, isJSONString));
});

describe(':isNil', () => {
  isNilTestData.forEach((data) => testFunctionHelper(data, isNil));
});

describe(':isNumber', () => {
  isNumberTestData.forEach((data) => testFunctionHelper(data, isNumber));
});

describe(':isObject', () => {
  isObjectTestData.forEach((data) => testFunctionHelper(data, isObject));
});

describe(':isObjectLike', () => {
  isObjectLikeTestData.forEach((data) => testFunctionHelper(data, isObjectLike));
});

describe(':isString', () => {
  isStringTestData.forEach((data) => testFunctionHelper(data, isString));
});
