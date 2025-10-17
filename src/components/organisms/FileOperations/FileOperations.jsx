import React, { useState } from 'react';
import { FileStringOperations } from '../../../components/molecules/FileStringOperations';
import { FileJsonOperations } from '../../../components/molecules/FileJsonOperations';
import { FileBase64Operations } from '../../../components/molecules/FileBase64Operations';
import './file-operations.css';

export const FileOperations = ({ content, onChange, operation, onChangeOperation }) => {
  return (
    <div className="container--center">
      <div className='file-operations-wrapper'>
        <input
          className='file-operations-input'
          type="radio"
          name='string-op'
          value='string'
          checked={operation === 'string'}
          onChange={() => {
            onChangeOperation('string');
          }}
        />
        <label
          className='file-operations-label'
          onClick={() => {
            onChangeOperation('string');
          }}
        >
          String
        </label>
        <input
          className='file-operations-input'
          type="radio"
          name='string-op'
          value='json'
          checked={operation === 'json'}
          onChange={() => {
            onChangeOperation('json');
          }}
        />
        <label
          className='file-operations-label'
          onClick={() => {
            onChangeOperation('json');
          }}
        >
          JSON
        </label>
        <input
          className='file-operations-input'
          type="radio"
          name='string-op'
          value='base64'
          checked={operation === 'base64'}
          onChange={() => {
            onChangeOperation('base64');
          }}
        />
        <label
          className='file-operations-label'
          onClick={() => {
            onChangeOperation('base64');
          }}
        >
          Base 64
        </label>
      </div>
      {operation === 'string' && <FileStringOperations content={content} onChange={onChange} />}
      {operation === 'json' && <FileJsonOperations content={content} onChange={onChange} />}
      {operation === 'base64' && <FileBase64Operations content={content} onChange={onChange} />}
    </div>
  );
};
