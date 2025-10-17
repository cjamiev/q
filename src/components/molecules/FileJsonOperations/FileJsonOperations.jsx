import React from 'react';
import { useDispatch } from 'react-redux';
import { createAlert, dismissAlert } from '../../../components/layout/Alert/alertActions';
import { parseObject, isJSONString } from '../../../utils/type-check';
import './file-json-operations.css';

const TWO = 2;

export const FileJsonOperations = ({ content, onChange }) => {
  const dispatch = useDispatch();

  return (
    <div className='file-json-operation-wrapper'>
      <button
        className='file-json-operation-btn'
        onClick={() => {
          dispatch(dismissAlert());
          const isValid = isJSONString(content);
          if (isValid) {
            onChange(JSON.stringify(JSON.parse(content), undefined, TWO));
          }
          const message = isValid ? 'Valid' : 'NOT Valid';
          const status = isValid ? 'success' : 'error';
          dispatch(createAlert({ content: message, status }));
        }}
      >
        Validate
      </button>
      <button
        className='file-json-operation-btn'
        onClick={() => {
          onChange(
            JSON.stringify(content)
              .replace(/\\n/g, '')
              .replace(/"/g, "'")
              .replace(/\\'/g, '"')
              .replace(/\w+:/g, (matched) => {
                return `"${matched.replace(':', '')}":`;
              })
          );
        }}
      >
        Stringify
      </button>
      <button
        className='file-json-operation-btn'
        onClick={() => {
          const parsed = parseObject(content.replace(/\"/g, '\\"').replace(/\'/g, '"'));
          if (parsed) {
            onChange(parsed);
          }
        }}
      >
        Parse
      </button>
      <button
        className='file-json-operation-btn'
        onClick={() => {
          const result = content
            .replace(/['|"]{/g, '{')
            .replace(/}['|"]/g, '}')
            .replace(/["]\w+["]:/g, (matched) => {
              return matched.replace(/["]/g, '');
            });
          onChange(result);
        }}
      >
        Object
      </button>
    </div>
  );
};
