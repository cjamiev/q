import { TIME, MONTHS, DAYS_OF_THE_WEEK } from 'constants/time';

const ZERO = 0;
const ONE = 1;
const DAYS_IN_A_WEEK = 7;
const DOUBLE_DIGIT = 10;
const SIXTY = 60;
const SIXTY_TIMES_SIXTY = 3600;

const incrementDate = (date, { weeks = ZERO, days = ZERO, hours = ZERO, minutes = ZERO, seconds = ZERO }) => {
  return new Date(date.getTime() + weeks * TIME.A_WEEK + days * TIME.A_DAY + hours * TIME.AN_HOUR + minutes * TIME.A_MINUTE + seconds * TIME.A_SECOND);
};

const secondsToClock = s => {
  const hours = Math.floor(s / SIXTY_TIMES_SIXTY);
  const minutes = Math.floor(s / SIXTY) % SIXTY;
  const seconds = s % SIXTY;

  return { hours, minutes, seconds };
};

const minutesToClock = m => {
  const hours = Math.floor(m / SIXTY);
  const minutes = m % SIXTY;
  const seconds = ZERO;

  return { hours, minutes, seconds };
};

const normalizeClock = (h = ZERO, m = ZERO, s = ZERO) => {
  const clockFromSeconds = secondsToClock(s);
  const clockFromMinutes = minutesToClock(m + clockFromSeconds.minutes);

  const seconds = clockFromSeconds.seconds;
  const minutes = clockFromMinutes.minutes;
  const hours = h + clockFromMinutes.hours + clockFromSeconds.hours;

  return { hours, minutes, seconds };
};

const getFormattedMinutes = minutes => (minutes < DOUBLE_DIGIT ? `:0${minutes}` : `:${minutes}`);

const getFormattedSeconds = seconds => (seconds < DOUBLE_DIGIT ? `:0${seconds}` : `:${seconds}`);

const formattedTimerClock = (h = ZERO, m = ZERO, s = ZERO) => {
  const { hours, minutes, seconds } = normalizeClock(h, m, s);

  return `${hours}${getFormattedMinutes(minutes)}${getFormattedSeconds(seconds)}`;
};

const clockBetweenDates = (date1, date2, options = { isWeeksRemoved: false, isDaysRemoved: false, isHoursRemoved: false, isMinutesRemoved: false }) => {
  const diff = date1.getTime() - date2.getTime();

  if (diff < ZERO) {
    return { hours: ZERO, minutes: ZERO, seconds: ZERO };
  }

  const weeks = options.isWeeksRemoved ? ZERO : Math.floor(diff / TIME.A_WEEK);
  const days = options.isDaysRemoved ? ZERO : Math.floor((diff - weeks * TIME.A_WEEK) / TIME.A_DAY);
  const hours = options.isHoursRemoved ? ZERO : Math.floor((diff - weeks * TIME.A_WEEK - days * TIME.A_DAY) / TIME.AN_HOUR);
  const minutes = options.isMinutesRemoved ? ZERO : Math.floor((diff - weeks * TIME.A_WEEK - days * TIME.A_DAY - hours * TIME.AN_HOUR) / TIME.A_MINUTE);
  const seconds = Math.floor(
    (diff - weeks * TIME.A_WEEK - days * TIME.A_DAY - hours * TIME.AN_HOUR - minutes * TIME.A_MINUTE) /
    TIME.A_SECOND
  );

  return { weeks, days, hours, minutes, seconds };
};

const getFormattedClock = (date) => {
  const LARGEST_SINGLE_DIGIT = 9;
  const LARGEST_AM_VALUE = 11;
  const MOD12 = 12;

  const givenDate = date ? date: new Date();
  const amOrpm = givenDate.getHours() > LARGEST_AM_VALUE ? 'PM' : 'AM';
  const minutes = givenDate.getMinutes() > LARGEST_SINGLE_DIGIT ? givenDate.getMinutes() : '0' + givenDate.getMinutes();
  const seconds = givenDate.getSeconds() > LARGEST_SINGLE_DIGIT ? givenDate.getSeconds() : '0' + givenDate.getSeconds();
  const format12Hour = givenDate.getHours() > LARGEST_SINGLE_DIGIT ? givenDate.getHours() % MOD12 : givenDate.getHours();
  const hours = format12Hour === ZERO ? '12' : format12Hour;

  return hours + ':' + minutes + ':' + seconds + ' ' + amOrpm;
};

const getFormattedDate = (date) => {
  const NUMBER_OF_LETTERS = 3;
  const PARTIAL_WEEK = 1.01;

  const givenDate = date ? date : new Date();
  const newYears = new Date(givenDate.getFullYear(), ZERO, ONE, ZERO, ZERO, ZERO);
  const firstWeekPartial = newYears.getDay() / DAYS_IN_A_WEEK + PARTIAL_WEEK;
  const timeBetweenNowAndNewYears = clockBetweenDates(givenDate, newYears);

  const displayDate = DAYS_OF_THE_WEEK[givenDate.getDay()] + ', ' + MONTHS[givenDate.getMonth()].slice(ZERO, NUMBER_OF_LETTERS) + ' ' + givenDate.getDate();
  const displayWeek = Math.trunc(firstWeekPartial + timeBetweenNowAndNewYears.weeks + timeBetweenNowAndNewYears.days / DAYS_IN_A_WEEK );

  return { date: displayDate, week: displayWeek };
};

export { incrementDate, clockBetweenDates, formattedTimerClock, normalizeClock, getFormattedClock, getFormattedDate };