import { swapPositionsTestData, decrementIndexTestData, incrementIndexTestData } from 'testHelper/testData/swap-data';
import { testFunctionHelper } from 'testHelper';
import { decrementIndex, incrementIndex, swapPositions } from './swap';

describe(':decrementIndex', () => {
  decrementIndexTestData.forEach((data) => testFunctionHelper(data, decrementIndex));
});

describe(':incrementIndex', () => {
  incrementIndexTestData.forEach((data) => testFunctionHelper(data, incrementIndex));
});

describe(':swapPositions', () => {
  swapPositionsTestData.forEach((data) => testFunctionHelper(data, swapPositions));
});
