import { streets, citiesAndStates } from '../../../mocks/address';
import { boyNames, girlNames, lastNames, emailhosts } from '../../../mocks/names';
import { everything } from 'mocks/words';

const letters = 'abcdefghijklmnopqrstuvwxyz';

const START_ZERO = 0;
const ADD_ONE = 1;
const SECOND_INDEX = 2;

const FIFTY_PERCENT = 50;

const SINGLE_DIGIT = 9;

const RANDOM_MAX_FOUR = 4;
const RANDOM_NONZERO_MAX = 9;
const RANDOM_MAX_TEN = 10;
const RANDOM_MAX_HUNDRED = 100;

const NUMBER_OF_MONTHS = 12;
const MAX_DAYS_OF_MOST_MONTHS = 31;
const MAX_DAYS_OF_SOME_MONTHS = 30;
const MAX_DAYS_OF_FEBRUARY = 28;
const INDEX_FOR_FEBRUARY = 2;
const INDEX_FOR_APRIL = 4;
const INDEX_FOR_JUNE = 6;
const INDEX_FOR_SEPTEMBER = 9;
const INDEX_FOR_NOVEMBER = 11;
const today = new Date();

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const generateRange = (min, max) => {
  return getRandomInt(max - min) + min;
};

// Work in progress
const generateWeightedRange = (min, max) => {
  const minAsString = String(min);
  const minLength = minAsString.length;
  const maxAsString = String(max);
  const maxLength = maxAsString.length;

  const randomLength = getRandomInt(maxLength - minLength + 1) + minLength;
  let randomNum = '';
  if (randomLength === minLength) {
    for (let i = 0; i < randomLength; i++) {
      console.log('hit min', minAsString.charAt(i));
      randomNum += getRandomInt(Number(minAsString.charAt(i)));
    }
  } else if (randomLength === maxLength) {
    for (let i = 0; i < randomLength; i++) {
      console.log('hit max', maxAsString.charAt(i));
      randomNum += getRandomInt(Number(maxAsString.charAt(i)));
    }
  } else {
    console.log('hit here');
    randomNum += '*';
    // for (let i = 0; i < randomLength; i++) {
    //   randomNum += getRandomInt(10);
    // }
  }

  return randomNum;
};

const customStringGenerator = (input, index) => {
  const content = input.split('');
  const result = content.map((item) => {
    if (item === '#') {
      return getRandomInt(RANDOM_MAX_TEN);
    }
    if (item === '@') {
      return letters.charAt(getRandomInt(letters.length));
    }
    if (item === '&') {
      const randomIndex = getRandomInt(letters.length);
      return randomIndex < RANDOM_MAX_TEN ? randomIndex : letters.charAt(getRandomInt(randomIndex - RANDOM_MAX_TEN));
    }
    if (item === ':') {
      const now = new Date();
      return now.getMonth() + ADD_ONE + '-' + now.getDate() + '-' + now.getFullYear();
    }
    if (item === '^') {
      return index + ADD_ONE;
    } else {
      return item;
    }
  });

  return result.join('');
};

const generateFirstName = (isGirl) => {
  const randomNameIndex = isGirl ? getRandomInt(girlNames.length) : getRandomInt(boyNames.length);
  return isGirl ? girlNames[randomNameIndex] : boyNames[randomNameIndex];
};

const generateLastName = () => {
  const randomNameIndex = getRandomInt(lastNames.length);
  return lastNames[randomNameIndex];
};

const generateEmailAddress = () => {
  const emailIndex = getRandomInt(emailhosts.length);
  const wordIndex = getRandomInt(everything.length);
  const wordIndex2 = getRandomInt(everything.length);
  const emailEnding = emailhosts[emailIndex];

  return (
    everything[wordIndex].toLocaleLowerCase() + '.' + everything[wordIndex2].toLocaleLowerCase() + '@' + emailEnding
  );
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

const generateCityAndState = (isCity) => {
  const randomStateNumber = getRandomInt(citiesAndStates.length);
  const stateObj = citiesAndStates[randomStateNumber];

  if (!isCity) {
    return stateObj.state;
  }
  const randomCityNumber = getRandomInt(stateObj.cities.length);
  const cityAndState = { state: stateObj.state, city: stateObj.cities[randomCityNumber] };

  return cityAndState;
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

const generateDate = (yearsFromThisYear, format) => {
  const randomYear = getRandomInt(yearsFromThisYear) + ADD_ONE;
  const randomMonth = getRandomInt(NUMBER_OF_MONTHS) + ADD_ONE;
  const randomDay = getRandomInt(getNumberofDays(randomMonth)) + ADD_ONE;

  const separator = format.includes('-') ? '-' : '/';
  const isMonthFirst = format.slice(START_ZERO, SECOND_INDEX) === 'MM';

  const year = today.getFullYear() - randomYear;
  const month = randomMonth > SINGLE_DIGIT ? randomMonth : '0' + randomMonth;
  const day = randomDay > SINGLE_DIGIT ? randomDay : '0' + randomDay;

  const randomDate = isMonthFirst
    ? `${month}${separator}${day}${separator}${year}`
    : `${year}${separator}${month}${separator}${day}`;

  return randomDate;
};

const generateBoolean = () => {
  const randomValue = getRandomInt(RANDOM_MAX_HUNDRED);

  return randomValue < FIFTY_PERCENT;
};

const generateCustomState = (states) => {
  const randomValue = getRandomInt(states.length);

  return states[randomValue];
};

export {
  generateFirstName,
  generateLastName,
  generateEmailAddress,
  generateStreetName,
  generateCityAndState,
  generateDate,
  generateBoolean,
  generateCustomState,
  generateRange,
  customStringGenerator
};
