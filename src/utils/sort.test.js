import {
  alphaAscendingSortTestData,
  alphaDescendingSortTestData,
  numericAscendingSortTestData,
  numericDescendingSortTestData,
  sortByDelimiterTestData
} from 'testHelper/testData/sort-data';
import { testFunctionHelper } from 'testHelper';
import {
  alphaAscendingSort,
  alphaDescendingSort,
  numericAscendingSort,
  numericDescendingSort,
  sortByDelimiter
} from './sort';

describe(':alphaAscendingSort', () => {
  alphaAscendingSortTestData.forEach((data) => testFunctionHelper(data, alphaAscendingSort));
});

describe(':alphaDescendingSort', () => {
  alphaDescendingSortTestData.forEach((data) => testFunctionHelper(data, alphaDescendingSort));
});

describe(':numericAscendingSort', () => {
  numericAscendingSortTestData.forEach((data) => testFunctionHelper(data, numericAscendingSort));
});

describe(':numericDescendingSort', () => {
  numericDescendingSortTestData.forEach((data) => testFunctionHelper(data, numericDescendingSort));
});

describe(':sortByDelimiter', () => {
  sortByDelimiterTestData.forEach((data) => testFunctionHelper(data, sortByDelimiter));
});
