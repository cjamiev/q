import { lowerCaseFirstLetter, capitalizeFirstLetter } from 'utils/stringHelper';

const INDEX_ZERO = 0;

const getJSONRow = (header, row) => {
  const result = header.reduce((accumulator, current, index) => {
    return { ...accumulator, [current]: row[index] };
  }, {});

  return JSON.stringify(result);
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

const getSQLDataType = (type) => {
  if (type === 'date') {
    return 'date';
  }
  if (type === 'boolean') {
    return 'bool';
  }
  if (type === 'number') {
    return 'int';
  }
  return 'varchar(100)';
};

// TODO: table name, customize format of column names
const getSQLCreateData = (header) => {
  const lineOne = 'CREATE TABLE <table-name> (';
  const remainingLines = header
    .map((i) => `  ${i.randomType.replace(' ', '_')} ${getSQLDataType(i.selectedDataType)}`)
    .join(',\n');

  return [lineOne, remainingLines, ');'].join('\n');
};

// TODO: table name, add where clause
const getSQLReadData = (header) => {
  return 'Select ' + header.join(', ') + ' From <table-name>';
};

const getReactChangeHandler = (selectedFormType, name) => {
  if (selectedFormType === 'checkbox' || selectedFormType === 'radio') {
    return `
        const onHandle${name}Click = (value) => {
          set${name}(value);
        };
      `;
  }

  return `
        const onHandle${name}Change = (event) => {
          const value = event.target.value;
          set${name}(value);
        };
      `;
};

// eslint-disable-next-line max-params
const getReactForm = (selectedFormType, variableName, lowerCasedName, upperCasedName, userOptions, index) => {
  if (selectedFormType === 'checkbox') {
    return userOptions
      .map((op) => {
        return `
        <div key='${op}'>
          <input type="checkbox" id="checkbox${op}" onClick={() => onHandle${upperCasedName}Click("${op}")} value='${op}' />
          <label htmlFor="checkbox${op}">${op}</label>
        </div>
        `;
      })
      .join('\n');
  } else if (selectedFormType === 'radio') {
    return userOptions
      .map((op) => {
        return `
        <div key='${op}'>
          <input type="radio" id="radioGroup${op}" name="radioGroup${index}" onClick={() => onHandle${upperCasedName}Click("${op}")} value='${op}' />
          <label htmlFor="radioGroup${op}">${op}</label>
        </div>
        `;
      })
      .join('\n');
  } else if (selectedFormType === 'select') {
    const optionElements = userOptions
      .map((op) => {
        return `
            <option key='${op}' value='${op}'>
              ${op}
            </option>
        `;
      })
      .join('\n');

    return `
          <select onChange={onHandle${upperCasedName}Change}>
            ${optionElements}
          </select>
        `;
  }
  return `
      <label>${variableName}</label>
      <input type="text" onChange={onHandle${upperCasedName}Change} placeholder={'Enter ${variableName}'} value={${lowerCasedName}}></input>
    `;
};

const getReactCode = (column) => {
  const { variableName, randomType, selectedFormType, userOptions } = column;
  const lowerCasedName = lowerCaseFirstLetter(variableName.split(' ').join(''));
  const upperCasedName = capitalizeFirstLetter(lowerCasedName);
  const options = userOptions.includes(',') ? userOptions.split(',') : userOptions.split('');

  return `
        const [${lowerCasedName}, set${upperCasedName}] = useState('${randomType}');
  
        ${getReactChangeHandler(selectedFormType, upperCasedName)}
  
        return (
          <div>
            ${getReactForm(selectedFormType, variableName, lowerCasedName, upperCasedName, options, INDEX_ZERO)}
          </div>
        );
        `;
};

const getAggregatedReactCode = (columns) => {
  const pieces = columns.map((item, index) => {
    const lowerCasedName = lowerCaseFirstLetter(item.variableName.split(' ').join(''));
    const upperCasedName = capitalizeFirstLetter(lowerCasedName);
    const options = item.userOptions.includes(',') ? item.userOptions.split(',') : item.userOptions.split('');

    const stateSection = `const [${lowerCasedName}, set${upperCasedName}] = useState('${item.randomType}');`;
    const onChangeSection = getReactChangeHandler(item.selectedFormType, upperCasedName);
    const JSXSection = getReactForm(
      item.selectedFormType,
      item.variableName,
      lowerCasedName,
      upperCasedName,
      options,
      index
    );

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

export {
  getJSONRow,
  getJSONData,
  getCSVData,
  getSQLInsertData,
  getSQLUpdateData,
  getSQLCreateData,
  getSQLReadData,
  getReactCode,
  getAggregatedReactCode
};
