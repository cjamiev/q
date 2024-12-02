/* eslint-disable no-magic-numbers */
import React, { useState } from 'react';
import {
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
} from './helper';
import { Temporal } from 'temporal-polyfill';

// input template, export: SQL, CSV, JSON
// Color Code, Time Stamp
// Random Unique String, Words, Number with N Digits,
// Money, Formula (compute from other columns/values), Geometric Distributed Number

const DataType = {
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
  EMAIL: 'Email',
  CITY: 'City',
  STATE: 'State',
  ADDRESS: 'Address',
  ZIP_CODE: 'Zip Code',
  SSN: 'Social Security Number',
  PHONE_NUMBER: 'Phone Number',
  GENDER: 'Gender',
  CREDIT_CARD: 'Credit Card Number',
  DATE: 'Date',
  BOOLEAN: 'Boolean'
};

export const DataGenerator = () => {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(100);
  const [columns, setColumns] = useState([
    { name: DataType.FIRST_NAME, type: DataType.FIRST_NAME },
    { name: DataType.LAST_NAME, type: DataType.LAST_NAME }
  ]);

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
    const { year, month, day } = generateDate(36);
    const date = Temporal.PlainDate.from(year + '-' + month + '-' + day);
    setData(date.toString());
  };

  const onHandleGenerateStreet = () => {
    const street = generateStreetName();
    setData(street);
  };

  const onHandleRemove = (selectedIndex) => {
    const updatedData = columns.filter((_, i) => i !== selectedIndex);

    setColumns(updatedData);
  };

  const validate = () => {
    const errors = columns.map((item, index) => {
      if (item.name) {
        return '';
      } else {
        return 'Error missing name for entry' + index + ' ' + item.type;
      }
    });

    return errors.filter(Boolean);
  };

  const onHandleGenerateData = () => {
    const errors = validate();
    if (errors[0]) {
      console.log(errors);
      return;
    }
    const result = [];
    for (let i = 0; i < rowCount; i++) {
      const currentRow = columns.map((col) => {
        if (col.type === DataType.FIRST_NAME) {
          const fullname = generateName();

          return { column: col.name, value: fullname.firstname };
        }
        if (col.type === DataType.LAST_NAME) {
          const fullname = generateName();

          return { column: col.name, value: fullname.lastname };
        } else {
          return { column: col.name, value: 'UNKOWN TYPE' };
        }
      });
      result.push(currentRow);
    }

    setData(result);
  };

  const onHandleCountUpdate = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setRowCount(value);
    }
  };

  const onHandleColumnNameChange = (event, selectedIndex) => {
    const value = event.target.value;
    if (value) {
      const updatedColumns = columns.map((item, index) => {
        if (selectedIndex === index) {
          return { ...item, name: value };
        } else {
          return item;
        }
      });

      setColumns(updatedColumns);
    }
  };

  console.log('hit', data);

  return (
    <div>
      <div>
        {columns.map((item, index) => {
          return (
            <div key={item.type}>
              <input
                type="text"
                onChange={(event) => {
                  onHandleColumnNameChange(event, index);
                }}
                value={item.name}
              />
              <span>{item.type}</span>
              {data.length > 1 && (
                <button
                  onClick={() => {
                    onHandleRemove(index);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          );
        })}
      </div>
      <button onClick={onHandleGenerateData}>Generate Data</button>
      <input type="text" onChange={onHandleCountUpdate} value={rowCount} />
      {/* <div>
        {data.map((item) => {
          return <span key={item}>{item}</span>;
        })}
      </div> */}
    </div>
  );
};
