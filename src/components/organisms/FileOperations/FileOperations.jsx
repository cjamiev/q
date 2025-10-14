import React, { useState } from 'react';
import { FileStringOperations } from '../../../components/molecules/FileStringOperations';
import { FileJsonOperations } from '../../../components/molecules/FileJsonOperations';
import './file-operations.css';

export const FileOperations = ({ content, onChange }) => {
  const [operation, setOperation] = useState('string');

  return (
    <div className="container--center">
      <div className='file-operations-wrapper'>
        <input
          className='file-operations-string'
          type="radio"
          name='string-op'
          value='string'
          checked={operation === 'string'}
          onChange={() => {
            setOperation('string');
          }}
        />
        <label
          className='file-operations-string-label'
          onClick={() => {
            setOperation('string');
          }}
        >
          String
        </label>
        <input
          className='file-operations-json'
          type="radio"
          name='string-op'
          value='json'
          checked={operation === 'json'}
          onChange={() => {
            setOperation('json');
          }}
        />
        <label
          className='file-operations-json-label'
          onClick={() => {
            setOperation('json');
          }}
        >
          JSON
        </label>
      </div>
      {operation === 'string' && <FileStringOperations content={content} onChange={onChange} />}
      {operation === 'json' && <FileJsonOperations content={content} onChange={onChange} />}
    </div>
  );
};
