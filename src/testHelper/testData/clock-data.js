const dayOne = new Date(2019, 0, 1, 0, 0, 0, 0);
const dayOneFiveInMorning = new Date(2019, 0, 1, 5, 0, 0, 0);
const dayOneNoon = new Date(2019, 0, 1, 12, 0, 0, 0);
const dayOneFiveInEvening = new Date(2019, 0, 1, 17, 0, 0, 0);
const dayOneBeforeMidnight = new Date(2019, 0, 1, 23, 59, 59, 0);
const dayTwo = new Date(2019, 0, 2, 0, 0, 0, 0);
const dayOnePlusOnes = new Date(2019, 0, 1, 1, 1, 1, 0);
const weekTwo = new Date(2019, 0, 8, 0, 0, 0, 0);

const incrementDateTestData = [
  { testMessage: 'One day increment', args: [dayOne, { days: 1 }], expectedResult: dayTwo },
  { testMessage: 'One day decrement', args: [dayTwo, { days: -1 }], expectedResult: dayOne }
];

const normalizeClockTestData = [
  { testMessage: 'no arguments', args: [], expectedResult: { hours: 0, minutes: 0, seconds: 0 } },
  { testMessage: 'Clock 5:55:55', args: [5, 55, 55], expectedResult: { hours: 5, minutes: 55, seconds: 55 } },
  { testMessage: 'Minutes overflow = 60', args: [0, 60, 0], expectedResult: { hours: 1, minutes: 0, seconds: 0 } },
  { testMessage: 'Seconds overflow = 60', args: [0, 1, 0], expectedResult: { hours: 0, minutes: 1, seconds: 0 } },
  { testMessage: 'Seconds overflow = 3600', args: [0, 0, 3600], expectedResult: { hours: 1, minutes: 0, seconds: 0 } },
  {
    testMessage: 'Minutes = 59 && Seconds overflow = 60',
    args: [0, 59, 60],
    expectedResult: { hours: 1, minutes: 0, seconds: 0 }
  },
  {
    testMessage: 'Minutes = 61 && Seconds overflow = 3661',
    args: [0, 61, 3661],
    expectedResult: { hours: 2, minutes: 2, seconds: 1 }
  }
];

const clockBetweenDatesTestData = [
  {
    testMessage: 'same day',
    args: [dayOne, dayOne],
    expectedResult: { weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  },
  {
    testMessage: 'one day difference',
    args: [dayTwo, dayOne],
    expectedResult: { weeks: 0, days: 1, hours: 0, minutes: 0, seconds: 0 }
  },
  {
    testMessage: 'one hour, one minutes, one second difference',
    args: [dayOnePlusOnes, dayOne],
    expectedResult: { weeks: 0, days: 0, hours: 1, minutes: 1, seconds: 1 }
  },
  {
    testMessage: 'one week difference',
    args: [weekTwo, dayOne],
    expectedResult: { weeks: 1, days: 0, hours: 0, minutes: 0, seconds: 0 }
  },
  {
    testMessage: 'one week, options with no week',
    args: [weekTwo, dayOne, { isWeeksRemoved: true }],
    expectedResult: { weeks: 0, days: 7, hours: 0, minutes: 0, seconds: 0 }
  },
  {
    testMessage: 'one week, options with no week/days',
    args: [weekTwo, dayOne, { isWeeksRemoved: true, isDaysRemoved: true }],
    expectedResult: { weeks: 0, days: 0, hours: 168, minutes: 0, seconds: 0 }
  }
];

const formattedTimerClockTestData = [
  { testMessage: 'no arguments', args: [], expectedResult: '0:00:00' },
  { testMessage: 'Clock 5:55:55', args: [5, 55, 55], expectedResult: '5:55:55' },
  { testMessage: '10 < seconds', args: [0, 0, 11], expectedResult: '0:00:11' },
  { testMessage: '10 > seconds', args: [0, 0, 9], expectedResult: '0:00:09' },
  { testMessage: '10 < minutes', args: [0, 11, 0], expectedResult: '0:11:00' },
  { testMessage: '10 > minutes', args: [0, 9, 0], expectedResult: '0:09:00' }
];

const getFormattedClockTestData = [
  { testMessage: 'Start of year', args: [dayOne], expectedResult: '12:00:00 AM' },
  { testMessage: 'Start of year 5am', args: [dayOneFiveInMorning], expectedResult: '5:00:00 AM' },
  { testMessage: 'Start of year noon', args: [dayOneNoon], expectedResult: '12:00:00 PM' },
  { testMessage: 'Start of year 5pm', args: [dayOneFiveInEvening], expectedResult: '5:00:00 PM' },
  { testMessage: 'Start of year before midnight', args: [dayOneBeforeMidnight], expectedResult: '11:59:59 PM' }
];

const getFormattedDateTestData = [
  { testMessage: 'Start of year', args: [dayOne], expectedResult: { date: 'Tue, Jan 1', week: 1 } },
  { testMessage: 'Second week of year', args: [weekTwo], expectedResult: { date: 'Tue, Jan 8', week: 2 } }
];

export {
  incrementDateTestData,
  normalizeClockTestData,
  clockBetweenDatesTestData,
  formattedTimerClockTestData,
  getFormattedClockTestData,
  getFormattedDateTestData
};
