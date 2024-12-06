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
import { lowerCaseFirstLetter, capitalizeFirstLetter, toCamelCaseFromDashCase } from 'utils/stringHelper';
import { pipe } from 'utils/compose';

/*
// insert sql template, json, csv switch between formats, preview mode
// customizable date format
// Color Code, Time Stamp
// Words, Fake Words, Password, Sentence
// Money, Formula (compute from other columns/values), Geometric Distributed Number
// improve email generator, with the name
// improve Custom format string generator
*/

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

const getSQLInsertData = (header, rows) => {
  const lineOne = `INSERT INTO Table (${header.map((i) => `'${i.replace(' ', '_')}'`).join(',')})`;
  const remainingLines = rows.map((entry) => `(${entry.map((i) => `'${i}'`).join(',')})`);

  return [lineOne, 'VALUES', ...remainingLines, ';'].join('\n');
};

const getSQLUpdateData = (header, row) => {
  const lineOne = 'UPDATE <table_name>';
  const remainingLines = row.map((data, index) => `${header[index]}='${data}'`).join(',');

  return [lineOne, 'SET ' + remainingLines, 'WHERE condition;'].join('\n');
};

// table name, customize format of column names
const getSQLCreateData = (header) => {
  const lineOne = 'CREATE TABLE <table-name> (';
  const remainingLines = header.map((i) => `${i} varchar(255)`);

  return [lineOne, ...remainingLines, ');'].join('\n');
};

// table name, add where clause
const getSQLReadData = (header) => {
  return 'Select ' + header.join(', ') + ' From <table-name>';
};

// table name, add where clause
const getSQLDeleteData = (header) => {
  return 'DELETE FROM <table_name> WHERE condition;';
};

const getReactCode = (column) => {
  const { name, type } = column;
  const formatVariable = pipe([lowerCaseFirstLetter, toCamelCaseFromDashCase]);
  const lowerCasedName = formatVariable(name.replace(' ', '-'));
  const upperCasedName = capitalizeFirstLetter(lowerCasedName);

  return `
      const [${lowerCasedName}, set${upperCasedName}] = useState('${type}');

      const onHandle${upperCasedName}Change = (event) => {
        const value = event.target.value;
        set${upperCasedName}(value);
      };

      return (
        <div>
          <label>${name}</label>
          <input type="text" onChange={onHandle${upperCasedName}Change} placeholder={'Enter ${name}'} value={${lowerCasedName}}></input>
        </div>
      );
      `;
};

const getAggregatedReactCode = (columns) => {
  const pieces = columns.map((item) => {
    const formatVariable = pipe([lowerCaseFirstLetter, toCamelCaseFromDashCase]);
    const name = formatVariable(item.name.replace(' ', '-'));
    const upperCasedName = capitalizeFirstLetter(name);

    const stateSection = `const [${name}, set${upperCasedName}] = useState('${item.type}');`;
    const onChangeSection = `
      const onHandle${upperCasedName}Change = (event) => {
        const value = event.target.value;
        set${upperCasedName}(value);
      };
    `;
    const JSXSection = `
      <label>${item.name}</label>
      <input type="text" onChange={onHandle${upperCasedName}Change} placeholder={'Enter ${item.name}'} value={${name}}></input>
    `;

    return { stateSection, onChangeSection, JSXSection };
  });

  const aggregateStateSection = pieces.map((item) => item.stateSection).join('\n');
  const aggregateOnChangeSection = pieces.map((item) => item.onChangeSection).join('');
  const aggregateJSXSection = pieces.map((item) => item.JSXSection).join('');

  const completedJSXSection = `
        return (
        <div>
          ${aggregateJSXSection}
        </div>
      );
  `;

  return aggregateStateSection + `\n${aggregateOnChangeSection}\n` + completedJSXSection;
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
  const columnNames = columns.map((i) => i.type.replace(' ', '_'));

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
                <button onClick={() => copyToClipboard(getReactCode(item))}>Get React Code</button>
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
      <button onClick={() => copyToClipboard(getAggregatedReactCode(columns))}>Get React Code</button>
      <button onClick={() => copyToClipboard(getSQLReadData(columnNames))}>Read SQL</button>
      <button onClick={() => copyToClipboard(getSQLCreateData(columnNames))}>Create SQL</button>
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
          <button
            onClick={() => {
              copyToClipboard(getSQLInsertData(headers, rows));
            }}
          >
            Copy as SQL Insert
          </button>
          <button
            onClick={() => {
              copyToClipboard(getSQLUpdateData(columnNames, rows[0]));
            }}
          >
            SQL Update
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
