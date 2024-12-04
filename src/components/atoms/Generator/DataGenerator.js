/* eslint-disable complexity */
/* eslint-disable no-magic-numbers */
import React, { useState } from 'react';
import {
  generateFirstName,
  generateLastName,
  generateGender,
  generateEmailAddress,
  generateStreetName,
  generateCityAndState,
  generateDate,
  generateBoolean,
  generateCustomState,
  customStringGenerator,
  ssn_format,
  phonenumber_format,
  zipcode_format,
  credit_card_format,
  uuid_format
} from './helper';
import { Temporal } from 'temporal-polyfill';

const DataType = {
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
  // EMAIL: 'Email',
  CITY: 'City',
  STREET: 'Street',
  ZIP_CODE: 'Zip Code',
  SSN: 'Social Security Number',
  PHONE_NUMBER: 'Phone Number',
  GENDER: 'Gender',
  CREDIT_CARD: 'Credit Card Number',
  UUID: 'uuid',
  DATE: 'Date',
  BOOLEAN: 'Boolean',
  CUSTOM_STATE: 'Custom State',
  CUSTOM_STRING: 'Custom String'
};

export const DataGenerator = () => {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(100);
  const [columns, setColumns] = useState([
    { name: DataType.FIRST_NAME, type: DataType.FIRST_NAME, options: '' },
    { name: DataType.LAST_NAME, type: DataType.LAST_NAME, options: '' }
  ]);

  const onHandleAddField = (name) => {
    const updatedData = columns.concat({ name, type: name, options: '' });

    setColumns(updatedData);
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
          const isGirl = generateBoolean();
          const firstname = generateFirstName(isGirl);

          return { column: col.name, value: firstname };
        }
        if (col.type === DataType.LAST_NAME) {
          const lastname = generateLastName();

          return { column: col.name, value: lastname };
        }
        if (col.type === DataType.SSN) {
          const ssn = customStringGenerator(ssn_format);

          return { column: col.name, value: ssn };
        }
        if (col.type === DataType.CITY) {
          const cityAndState = generateCityAndState();

          return { column: col.name, value: cityAndState.city + ', ' + cityAndState.state };
        }
        if (col.type === DataType.ZIP_CODE) {
          const zipCode = customStringGenerator(zipcode_format);

          return { column: col.name, value: zipCode };
        }
        if (col.type === DataType.CREDIT_CARD) {
          const ccnumber = customStringGenerator(credit_card_format);

          return { column: col.name, value: ccnumber };
        }
        if (col.type === DataType.UUID) {
          const uuid = customStringGenerator(uuid_format);

          return { column: col.name, value: uuid };
        }
        if (col.type === DataType.GENDER) {
          const gender = generateGender();

          return { column: col.name, value: gender };
        }
        if (col.type === DataType.PHONE_NUMBER) {
          const phonenumber = customStringGenerator(phonenumber_format);

          return { column: col.name, value: phonenumber };
        }
        if (col.type === DataType.DATE) {
          const { year, month, day } = generateDate(36);
          const date = Temporal.PlainDate.from(year + '-' + month + '-' + day);
          return { column: col.name, value: date.toString() };
        }
        // if (col.type === DataType.EMAIL) {
        //   const email = generateEmailAddress(36);
        //   return { column: col.name, value: email };
        // }
        if (col.type === DataType.STREET) {
          const street = generateStreetName();

          return { column: col.name, value: street };
        }
        if (col.type === DataType.BOOLEAN) {
          const bool = generateBoolean();

          return { column: col.name, value: bool };
        }
        if (col.type === DataType.CUSTOM_STATE) {
          const states = col.options.includes(',') ? col.options.split(',') : col.options.split('');
          const customStates = generateCustomState(states);

          return { column: col.name, value: customStates };
        }
        if (col.type === DataType.CUSTOM_STRING) {
          const customString = customStringGenerator(col.options, i);

          return { column: col.name, value: customString };
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

  const onHandleColumnOptionsChange = (event, selectedIndex) => {
    const value = event.target.value;
    if (value) {
      const updatedColumns = columns.map((item, index) => {
        if (selectedIndex === index) {
          return { ...item, options: value };
        } else {
          return item;
        }
      });

      setColumns(updatedColumns);
    }
  };

  console.log(data);

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
              {(item.type === DataType.CUSTOM_STATE || item.type === DataType.CUSTOM_STRING) && (
                <input
                  type="text"
                  onChange={(event) => {
                    onHandleColumnOptionsChange(event, index);
                  }}
                  value={item.options}
                />
              )}
              {columns.length > 1 && (
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
        <div>
          {Object.keys(DataType).map((type) => {
            return (
              <button
                key={type}
                onClick={() => {
                  onHandleAddField(DataType[type]);
                }}
              >
                Generate {DataType[type]}
              </button>
            );
          })}
        </div>
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
