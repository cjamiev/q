import {
  generateFirstName,
  generateLastName,
  generateEmailAddress,
  generateStreetName,
  generateCityAndState,
  generateDate,
  generateBoolean,
  generateCustomState,
  customStringGenerator
} from './randomHelper';
import { RandomType } from './types';

const THREE_YEARS_IN_MONTHS = 36;

const getPIGeneratedValue = (col) => {
  if (col.randomType === RandomType.FIRST_NAME) {
    const isGirl = generateBoolean();
    const firstname = generateFirstName(isGirl);

    return firstname;
  }
  if (col.randomType === RandomType.LAST_NAME) {
    const lastname = generateLastName();

    return lastname;
  }
  if (col.randomType === RandomType.SSN) {
    const ssn = customStringGenerator(col.selectedBuiltInOptions);

    return ssn;
  }
  if (col.randomType === RandomType.CREDIT_CARD) {
    const ccnumber = customStringGenerator(col.selectedBuiltInOptions);

    return ccnumber;
  }
  if (col.randomType === RandomType.PHONE_NUMBER) {
    const phonenumber = customStringGenerator(col.selectedBuiltInOptions);

    return phonenumber;
  }
  if (col.randomType === RandomType.EMAIL) {
    const email = generateEmailAddress();
    return email;
  } else {
    return '';
  }
};

const getAddressGeneratedValue = (col) => {
  if (col.randomType === RandomType.STREET) {
    const street = generateStreetName();

    return street;
  }
  if (col.randomType === RandomType.CITY) {
    const cityAndState = generateCityAndState(true);
    const value =
      col.selectedBuiltInOptions === 'City Only' ? cityAndState.city : cityAndState.city + ',' + cityAndState.state;
    return value;
  }
  if (col.randomType === RandomType.STATE) {
    const state = generateCityAndState();

    return state;
  }
  if (col.randomType === RandomType.ZIP_CODE) {
    const zipCode = customStringGenerator(col.selectedBuiltInOptions);

    return zipCode;
  } else {
    return '';
  }
};

const getOtherGeneratedValue = (col) => {
  if (col.randomType === RandomType.UUID) {
    const uuid = customStringGenerator(col.selectedBuiltInOptions);

    return uuid;
  }
  if (col.randomType === RandomType.DATE) {
    const randomDate = generateDate(THREE_YEARS_IN_MONTHS, col.selectedBuiltInOptions);

    return randomDate;
  }

  if (col.randomType === RandomType.BOOLEAN) {
    const bool = generateBoolean();

    return bool ? 'true' : 'false';
  }
  if (col.randomType === RandomType.CUSTOM_STATE) {
    const states = col.userOptions.includes(',') ? col.userOptions.split(',') : col.userOptions.split('');
    const customStates = generateCustomState(states);

    return customStates;
  }
  if (col.randomType === RandomType.CUSTOM_STRING) {
    const customString = customStringGenerator(col.options, i);

    return customString;
  } else {
    return '';
  }
};

const getCorrectGeneratedValue = (col) => {
  const piValue = getPIGeneratedValue(col);
  if (piValue) {
    return piValue;
  }

  const addressValue = getAddressGeneratedValue(col);
  if (addressValue) {
    return addressValue;
  }

  const otherValue = getOtherGeneratedValue(col);
  if (otherValue) {
    return otherValue;
  } else {
    return 'UNKOWN TYPE';
  }
};

export { getCorrectGeneratedValue };
