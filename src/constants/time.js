const DAYS_IN_A_WEEK = 7;
const HOURS_IN_DAY = 24;
const SIXTY = 60;
const SECOND_IN_MILLISECONDS = 1000;
const MINUTE_IN_MILLISECONDS = SIXTY * SECOND_IN_MILLISECONDS;
const HOUR_IN_MILLISECONDS = SIXTY * MINUTE_IN_MILLISECONDS;
const DAY_IN_MILLISECONDS = HOURS_IN_DAY * HOUR_IN_MILLISECONDS;
const WEEK_IN_MILLISECONDS = DAYS_IN_A_WEEK * DAY_IN_MILLISECONDS;

export const TIME = {
  A_SECOND: SECOND_IN_MILLISECONDS,
  A_MINUTE: MINUTE_IN_MILLISECONDS,
  AN_HOUR: HOUR_IN_MILLISECONDS,
  A_DAY: DAY_IN_MILLISECONDS,
  A_WEEK: WEEK_IN_MILLISECONDS
};

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const DAYS_OF_THE_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
