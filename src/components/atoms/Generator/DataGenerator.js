/* eslint-disable complexity */
/* eslint-disable no-magic-numbers */
import React, { useState } from 'react';
import { Temporal } from 'temporal-polyfill';
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
import { copyToClipboard } from 'utils/copy';
import {
  SCNewFieldSection,
  SCAddedFieldsWrapper,
  SCNewFieldBtnWrapper,
  SCHeaderWrapper,
  SCTableHeader,
  SCRowWrapper,
  SCTableRow
} from './styles';

// input template, export: SQL, CSV, JSON

const DataType = {
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
  EMAIL: 'Email',
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

const getTableData = (data) => {
  if (!data.length) {
    return { headers: [], rows: [] };
  }

  const headers = data[0].map((i) => i.column);
  const rows = data.map((item) => {
    return item.map((i) => i.value);
  });

  return { headers, rows };
};

const getJSONData = (data) => {
  if (!data.length) {
    return [];
  }

  const result = data.map((entry) => {
    return entry
      .map((item) => {
        return { [item.column]: item.value };
      })
      .reduce((accumulator, current) => {
        return { ...accumulator, ...current };
      }, {});
  });

  return JSON.stringify(result);
};

const getCSVData = (header, rows) => {
  const lineOne = header.join(',');
  const remainingLines = rows.map((entry) => entry.join(','));

  return [lineOne, ...remainingLines].join('\n');
};

const getJSONRow = (header, row) => {
  const result = header.reduce((accumulator, current, index) => {
    return { ...accumulator, [current]: row[index] };
  }, {});

  return JSON.stringify(result);
};

export const DataGenerator = () => {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(10);
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
        if (col.type === DataType.EMAIL) {
          const email = generateEmailAddress(36);
          return { column: col.name, value: email };
        }
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

  const deleteRow = (rowIndex) => {
    const updatedData = data.filter((_, index) => index !== rowIndex);

    setData(updatedData);
  };

  const { headers, rows } = getTableData(data);

  return (
    <div>
      <SCNewFieldSection>
        <SCAddedFieldsWrapper>
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
        </SCAddedFieldsWrapper>
        <SCNewFieldBtnWrapper>
          {Object.keys(DataType)
            .filter((item) => !columns.some((element) => element.type === DataType[item]))
            .map((type) => {
              return (
                <button
                  key={type}
                  onClick={() => {
                    onHandleAddField(DataType[type]);
                  }}
                >
                  {DataType[type]}
                </button>
              );
            })}
        </SCNewFieldBtnWrapper>
      </SCNewFieldSection>
      <button onClick={onHandleGenerateData}>Generate Data</button>
      <input type="text" onChange={onHandleCountUpdate} value={rowCount} />
      {data.length ? (
        <div>
          <button
            onClick={() => {
              copyToClipboard(getJSONData(data));
            }}
          >
            Copy as JSON
          </button>
          <button
            onClick={() => {
              copyToClipboard(getCSVData(headers, rows));
            }}
          >
            Copy as CSV
          </button>
        </div>
      ) : (
        <span />
      )}
      <div>
        <SCHeaderWrapper>
          {headers.map((item) => {
            return <SCTableHeader key={item}>{item}</SCTableHeader>;
          })}
        </SCHeaderWrapper>
        {rows.map((entry, index) => {
          return (
            <SCRowWrapper key={JSON.stringify(entry)}>
              {entry.map((item) => {
                return <SCTableRow key={item}>{item}</SCTableRow>;
              })}
              <button
                onClick={() => {
                  deleteRow(index);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  copyToClipboard(getJSONRow(headers, entry));
                }}
              >
                Copy
              </button>
            </SCRowWrapper>
          );
        })}
      </div>
    </div>
  );
};
