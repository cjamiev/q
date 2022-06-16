import {
  decrementElementIndexTestData,
  differenceTestData,
  dropTestData,
  flattenTestData,
  flattenDeepTestData,
  incrementElementIndexTestData,
  swapArrayElementPositionsTestData,
  unqiueTestData
} from 'testHelper/testData/arrayHelper-data';
import { testFunctionHelper } from 'testHelper';
import {
  decrementElementIndex,
  difference,
  drop,
  flatten,
  flattenDeep,
  incrementElementIndex,
  swapArrayElementPositions,
  unique
} from './arrayHelper';

describe(':swapArrayElementPositions', () => {
  swapArrayElementPositionsTestData.forEach((data) => testFunctionHelper(data, swapArrayElementPositions));
});

describe(':decrementElementIndex', () => {
  decrementElementIndexTestData.forEach((data) => testFunctionHelper(data, decrementElementIndex));
});

describe(':incrementElementIndex', () => {
  incrementElementIndexTestData.forEach((data) => testFunctionHelper(data, incrementElementIndex));
});

describe(':difference', () => {
  differenceTestData.forEach((data) => testFunctionHelper(data, difference));
});

describe(':drop', () => {
  dropTestData.forEach((data) => testFunctionHelper(data, drop));
});

describe(':flatten', () => {
  flattenTestData.forEach((data) => testFunctionHelper(data, flatten));
});

describe(':flattenDeep', () => {
  flattenDeepTestData.forEach((data) => testFunctionHelper(data, flattenDeep));
});

describe(':unique', () => {
  unqiueTestData.forEach((data) => testFunctionHelper(data, unique));
});
