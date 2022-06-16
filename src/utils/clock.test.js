import {
  incrementDateTestData,
  clockBetweenDatesTestData,
  formattedTimerClockTestData,
  normalizeClockTestData,
  getFormattedClockTestData,
  getFormattedDateTestData
} from 'testHelper/testData/clock-data';
import { testFunctionHelper } from 'testHelper';
import {
  incrementDate,
  clockBetweenDates,
  formattedTimerClock,
  normalizeClock,
  getFormattedClock,
  getFormattedDate
} from './clock';

describe(':incrementDate', () => {
  incrementDateTestData.forEach((data) => testFunctionHelper(data, incrementDate));
});

describe(':clockBetweenDates', () => {
  clockBetweenDatesTestData.forEach((data) => testFunctionHelper(data, clockBetweenDates));
});

describe(':formattedTimerClock', () => {
  formattedTimerClockTestData.forEach((data) => testFunctionHelper(data, formattedTimerClock));
});

describe(':normalizeClock', () => {
  normalizeClockTestData.forEach((data) => testFunctionHelper(data, normalizeClock));
});

describe(':getFormattedClock', () => {
  getFormattedClockTestData.forEach((data) => testFunctionHelper(data, getFormattedClock));
});

describe(':getFormattedDate', () => {
  getFormattedDateTestData.forEach((data) => testFunctionHelper(data, getFormattedDate));
});
