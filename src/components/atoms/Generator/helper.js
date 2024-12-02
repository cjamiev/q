import { streets, citiesAndStates } from '../../../mocks/address';
import { boyNames, girlNames, lastNames, emailhosts } from '../../../mocks/names';

const START_ZERO = 0;
const ADD_ONE = 1;

const FIFTY_PERCENT = 50;
const LESS_THAN_FIFTY_PERCENT = 49;

const INDEX_THREE = 3;
const INDEX_FIVE = 5;
const INDEX_SIX = 6;
const INDEX_NINE = 9;
const INDEX_TEN = 10;
const FIVE_DIGITS = 5;
const NINE_DIGITS = 9;
const TEN_DIGITS = 10;

const SINGLE_DIGIT = 9;
const DOUBLE_DIGIT = 99;

const RANDOM_MAX_FOUR = 4;
const RANDOM_NONZERO_MAX = 9;
const RANDOM_MAX_TEN = 10;
const RANDOM_MAX_HUNDRED = 100;

const NUMBER_OF_MONTHS = 12;
const MAX_DAYS_OF_MOST_MONTHS = 31;
const MAX_DAYS_OF_SOME_MONTHS = 30;
const MAX_DAYS_OF_FEBRUARY = 30;
const INDEX_FOR_FEBRUARY = 1;
const INDEX_FOR_APRIL = 3;
const INDEX_FOR_JUNE = 5;
const INDEX_FOR_SEPTEMBER = 8;
const INDEX_FOR_NOVEMBER = 10;
const today = new Date();

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const generateRandomNumberOfSizeN = (n) => {
  let randomnumber = '';
  for (let i = START_ZERO; i < n; i++) {
    const newDigit = getRandomInt(RANDOM_MAX_TEN);
    randomnumber += newDigit;
  }

  return randomnumber;
};

const generateName = (isGirl) => {
  const randomFirstIndex = isGirl ? getRandomInt(girlNames.length) : getRandomInt(boyNames.length);
  const randomLastIndex = getRandomInt(lastNames.length);
  return {
    firstname: isGirl ? girlNames[randomFirstIndex] : boyNames[randomFirstIndex],
    lastname: lastNames[randomLastIndex]
  };
};

const generateGender = () => {
  const randomGender = getRandomInt(RANDOM_MAX_HUNDRED) + ADD_ONE;

  if (randomGender < FIFTY_PERCENT) {
    return 'Male';
  } else if (randomGender > LESS_THAN_FIFTY_PERCENT && randomGender <= DOUBLE_DIGIT) {
    return 'Female';
  } else {
    return 'Other';
  }
};

const generateSSN = () => {
  const ssn = generateRandomNumberOfSizeN(NINE_DIGITS);

  return (
    ssn.substring(START_ZERO, INDEX_THREE) +
    '-' +
    ssn.substring(INDEX_THREE, INDEX_FIVE) +
    '-' +
    ssn.substring(INDEX_FIVE, INDEX_NINE)
  );
};

const generatePhoneNumber = () => {
  const phone = generateRandomNumberOfSizeN(TEN_DIGITS);

  return (
    phone.substring(START_ZERO, INDEX_THREE) +
    '-' +
    phone.substring(INDEX_THREE, INDEX_SIX) +
    '-' +
    phone.substring(INDEX_SIX, INDEX_TEN)
  );
};

const generateEmailAddress = (firstname, lastname) => {
  const emailIndex = getRandomInt(emailhosts.length);
  const emailEnding = emailhosts(emailIndex);

  return firstname + '.' + lastname + '@' + emailEnding;
};

const generateStreetName = () => {
  const numberOfDigits = getRandomInt(RANDOM_MAX_FOUR) + ADD_ONE;
  const randomStreetIndex = getRandomInt(streets.length);

  let addressNumber = '';
  for (let i = START_ZERO; i < numberOfDigits; i++) {
    const newDigit = i === START_ZERO ? getRandomInt(RANDOM_NONZERO_MAX) + ADD_ONE : getRandomInt(RANDOM_MAX_TEN);
    addressNumber += newDigit;
  }

  return addressNumber + ' ' + streets[randomStreetIndex];
};

const generateCityAndState = () => {
  const randomStateNumber = getRandomInt(citiesAndStates.length);
  const stateObj = citiesAndStates[randomStateNumber];
  const randomCityNumber = getRandomInt(stateObj.cities.length);
  const cityAndState = { state: stateObj.state, city: stateObj.cities[randomCityNumber] };

  return cityAndState;
};

const generateZipCode = (isNineDigit) => {
  const length = isNineDigit ? NINE_DIGITS : FIVE_DIGITS;
  const zipcode = generateRandomNumberOfSizeN(length);

  return isNineDigit
    ? zipcode.substring(START_ZERO, INDEX_FIVE) + '-' + zipcode.substring(INDEX_FIVE, INDEX_NINE)
    : zipcode;
};

const getNumberofDays = (numberOfMonth) => {
  if (
    numberOfMonth === INDEX_FOR_APRIL ||
    numberOfMonth === INDEX_FOR_JUNE ||
    numberOfMonth === INDEX_FOR_SEPTEMBER ||
    numberOfMonth === INDEX_FOR_NOVEMBER
  ) {
    return MAX_DAYS_OF_SOME_MONTHS;
  } else if (numberOfMonth === INDEX_FOR_FEBRUARY) {
    return MAX_DAYS_OF_FEBRUARY;
  } else {
    return MAX_DAYS_OF_MOST_MONTHS;
  }
};

const generateDate = (yearsFromThisYear) => {
  const randomYear = getRandomInt(yearsFromThisYear) + ADD_ONE;
  const randomMonth = getRandomInt(NUMBER_OF_MONTHS) + ADD_ONE;
  const randomDay = getRandomInt(getNumberofDays(randomMonth)) + ADD_ONE;

  return {
    year: today.getFullYear() - randomYear,
    month: randomMonth > SINGLE_DIGIT ? randomMonth : '0' + randomMonth,
    day: randomDay > SINGLE_DIGIT ? randomDay : '0' + randomDay
  };
};

const generateBoolean = () => {
  const randomValue = getRandomInt(RANDOM_MAX_HUNDRED);

  return randomValue < FIFTY_PERCENT;
};

export {
  generateName,
  generateGender,
  generateSSN,
  generatePhoneNumber,
  generateEmailAddress,
  generateStreetName,
  generateCityAndState,
  generateZipCode,
  generateDate,
  generateBoolean,
  generateRandomNumberOfSizeN
};
