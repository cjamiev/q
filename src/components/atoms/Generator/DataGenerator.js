/* eslint-disable complexity */
import React, { useState } from 'react';
import { copyToClipboard } from 'utils/copy';
import { GeneratedSection } from './GeneratedSection';
import { FieldSection } from './FieldSection';
import { fieldTypes } from './types';
import { getSQLCreateData, getSQLReadData, getAggregatedReactCode } from './exportHelper';
import { getCorrectGeneratedValue } from './helper';
/*
 * TODO:
 * insert sql template, json, csv switch between formats, preview mode
 * customizable date format
 * Color Code, Time Stamp
 * Words, Fake Words, Password, Sentence
 * Money, Formula (compute from other columns/values), Geometric/Weighted Distributed Number
 * improve email generator, with the name
 * improve Custom format string generator
 */

const INDEX_ZERO = 0;
const ZERO = 0;
const DEFAULT_ROW_COUNT = 10;

export const DataGenerator = () => {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(DEFAULT_ROW_COUNT);
  const [columns, setColumns] = useState([fieldTypes[INDEX_ZERO]]);

  const validate = () => {
    const errors = columns.map((item, index) => {
      if (item.variableName) {
        return '';
      } else {
        return 'Error missing name for entry' + index + ' ' + item.randomType;
      }
    });

    return errors.filter(Boolean);
  };

  const generateData = () => {
    const errors = validate();
    if (errors[INDEX_ZERO]) {
      console.log(errors);
      return;
    }
    const result = [];
    for (let i = ZERO; i < rowCount; i++) {
      const currentRow = columns.map((col) => {
        const value = getCorrectGeneratedValue(col);

        return { column: col.variableName, value };
      });
      result.push(currentRow);
    }

    setData(result);
  };

  const deleteRowFromData = (rowIndex) => {
    const updatedData = data.filter((_, index) => index !== rowIndex);

    setData(updatedData);
  };

  const onHandleCountUpdate = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setRowCount(value);
    }
  };

  const onHandleAddField = (randomType) => {
    const initialField = fieldTypes.find((i) => i.randomType === randomType);
    const updatedData = columns.concat(initialField);

    setColumns(updatedData);
  };

  const onHandleRemoveField = (selectedIndex) => {
    const updatedData = columns.filter((_, i) => i !== selectedIndex);

    setColumns(updatedData);
  };

  const onHandleColumnNameChange = (event, selectedIndex) => {
    const value = event.target.value;
    if (value) {
      const updatedColumns = columns.map((item, index) => {
        if (selectedIndex === index) {
          return { ...item, variableName: value };
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
          return { ...item, userOptions: value };
        } else {
          return item;
        }
      });

      setColumns(updatedColumns);
    }
  };

  const onHandleBuiltInOptionsChange = (event, selectedIndex) => {
    const value = event.target.value;
    if (value) {
      const updatedColumns = columns.map((item, index) => {
        if (selectedIndex === index) {
          return { ...item, selectedBuiltInOptions: value };
        } else {
          return item;
        }
      });

      setColumns(updatedColumns);
    }
  };

  const onHandleDataTypeChange = (event, selectedIndex) => {
    const value = event.target.value;
    if (value) {
      const updatedColumns = columns.map((item, index) => {
        if (selectedIndex === index) {
          return { ...item, selectedDataType: value };
        } else {
          return item;
        }
      });

      setColumns(updatedColumns);
    }
  };

  const onHandleFormTypeChange = (event, selectedIndex) => {
    const value = event.target.value;
    if (value) {
      const updatedColumns = columns.map((item, index) => {
        if (selectedIndex === index) {
          return { ...item, selectedFormType: value };
        } else {
          return item;
        }
      });

      setColumns(updatedColumns);
    }
  };

  const columnNames = columns.map((i) => i.randomType.replace(' ', '_'));

  return (
    <div>
      <FieldSection
        columns={columns}
        onHandleAddField={onHandleAddField}
        onHandleRemoveField={onHandleRemoveField}
        onHandleColumnNameChange={onHandleColumnNameChange}
        onHandleColumnOptionsChange={onHandleColumnOptionsChange}
        onHandleBuiltInOptionsChange={onHandleBuiltInOptionsChange}
        onHandleDataTypeChange={onHandleDataTypeChange}
        onHandleFormTypeChange={onHandleFormTypeChange}
      />
      <button onClick={() => copyToClipboard(getAggregatedReactCode(columns))}>Get React Code</button>
      <button onClick={() => copyToClipboard(getSQLReadData(columnNames))}>Read SQL</button>
      <button onClick={() => copyToClipboard(getSQLCreateData(columns))}>Create SQL</button>
      <button onClick={generateData}>Generate Data</button>
      <input type="text" onChange={onHandleCountUpdate} value={rowCount} />
      <GeneratedSection data={data} deleteRow={deleteRowFromData} />
    </div>
  );
};
