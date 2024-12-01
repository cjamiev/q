/* eslint-disable no-magic-numbers */
import React, { useState } from 'react';
import { streets, citiesAndStates } from '../../../mocks/address';
import { boyNames, girlNames, lastNames } from '../../../mocks/names';
import { Temporal } from 'temporal-polyfill';

// input template, export: SQL, CSV, JSON
// First Name, Last Name, Email, City, State, Address, Zip Code, SSN, Phone Number, Gender, Credit Card Number,
// Date, Time Stamp,
// Color Code

// Random Unique String, Words, Animals, Plants, Fruits, Boolean, Number with N Digits,
// Money, Formula (compute from other columns/values), Geometric Distributed Number

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const generateSSN = () => {
  let ssn = '';
  for (let i = 0; i < 9; i++) {
    const newDigit = getRandomInt(10);
    ssn += newDigit;
  }

  return ssn.substring(0, 3) + '-' + ssn.substring(3, 5) + '-' + ssn.substring(5, 9);
};

const generateZipCode = (isNineDigit) => {
  let zipcode = '';
  const length = isNineDigit ? 9 : 5;
  for (let i = 0; i < length; i++) {
    const newDigit = getRandomInt(10);
    zipcode += newDigit;
  }

  return isNineDigit ? zipcode.substring(0, 5) + '-' + zipcode.substring(5, 9) : zipcode;
};

const generateCityAndState = () => {
  const randomStateNumber = getRandomInt(citiesAndStates.length);
  const stateObj = citiesAndStates[randomStateNumber];
  const randomCityNumber = getRandomInt(stateObj.cities.length);
  const cityAndState = { state: stateObj.state, city: stateObj.cities[randomCityNumber] };

  return cityAndState;
};

const generateName = (isGirl) => {
  const randomFirstIndex = isGirl ? getRandomInt(girlNames.length) : getRandomInt(boyNames.length);
  const randomLastIndex = getRandomInt(lastNames.length);
  return {
    firstname: isGirl ? girlNames[randomFirstIndex] : boyNames[randomFirstIndex],
    lastname: lastNames[randomLastIndex]
  };
};

const getNumberofDays = (numberOfMonth) => {
  if (numberOfMonth === 3 || numberOfMonth === 5 || numberOfMonth === 8 || numberOfMonth === 10) {
    return 30;
  } else if (numberOfMonth === 1) {
    return 28;
  } else {
    return 31;
  }
};

const generateDate = () => {
  const randomYear = getRandomInt(36) + 1;
  const randomMonth = getRandomInt(12) + 1;
  const randomDay = getRandomInt(getNumberofDays(randomMonth)) + 1;

  return {
    year: 2024 - randomYear,
    month: randomMonth > 9 ? randomMonth : '0' + randomMonth,
    day: randomDay > 9 ? randomDay : '0' + randomDay
  };
};

const generateStreetName = () => {
  const numberOfDigits = getRandomInt(4) + 1;
  const randomStreetIndex = getRandomInt(streets.length);

  let addressNumber = '';
  for (let i = 0; i < numberOfDigits; i++) {
    const newDigit = i === 0 ? getRandomInt(9) + 1 : getRandomInt(10);
    addressNumber += newDigit;
  }

  return addressNumber + ' ' + streets[randomStreetIndex];
};

const stripData = (data) => {
  return data.split('').map((i) => {
    if (!isNaN(Number(i))) {
      return '';
    }

    return i;
  });
};

export const DataGenerator = () => {
  const [data, setData] = useState('');

  const onHandleGenerateSSN = () => {
    setData(generateSSN());
  };

  const onHandleGenerateZipCode = () => {
    setData(generateZipCode(false));
  };

  const onHandleGenerateNineDigitZipCode = () => {
    setData(generateZipCode(true));
  };

  const onHandleGenerateCityAndState = () => {
    const cityAndState = generateCityAndState();
    setData(cityAndState.city + ', ' + cityAndState.state);
  };

  const onHandleGenerateBoyName = () => {
    const fullname = generateName();
    setData(fullname.lastname + ', ' + fullname.firstname);
  };

  const onHandleGenerateGirlName = () => {
    const fullname = generateName(true);
    setData(fullname.lastname + ', ' + fullname.firstname);
  };

  const onHandleGenerateDate = () => {
    const { year, month, day } = generateDate();
    const date = Temporal.PlainDate.from(year + '-' + month + '-' + day);
    setData(date.toString());
  };

  const onHandleGenerateStreet = () => {
    const street = generateStreetName();
    setData(street);
  };

  const onHandleGenerateAddress = () => {
    const street = generateStreetName();
    const cityAndState = generateCityAndState();
    const zipCode = generateZipCode(false);

    setData(street + '\n' + cityAndState.city + ',' + cityAndState.state + ' ' + zipCode);
  };

  return (
    <div>
      <div>{data}</div>
      <button onClick={onHandleGenerateSSN}>Generate New SSN</button>
      <button onClick={onHandleGenerateZipCode}>Generate Zipcode</button>
      <button onClick={onHandleGenerateNineDigitZipCode}>Generate 9 digit Zipcode</button>
      <button onClick={onHandleGenerateCityAndState}>Generate City And State</button>
      <button onClick={onHandleGenerateBoyName}>Generate Boy Name</button>
      <button onClick={onHandleGenerateGirlName}>Generate Girl Name</button>
      <button onClick={onHandleGenerateDate}>Generate Date</button>
      <button onClick={onHandleGenerateStreet}>Generate Street</button>
      <button onClick={onHandleGenerateAddress}>Generate Address</button>
    </div>
  );
};
