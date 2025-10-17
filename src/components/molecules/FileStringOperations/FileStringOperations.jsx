import React, { useState } from 'react';
import {
  alphaAscendingSort,
  alphaDescendingSort,
  numericAscendingSort,
  numericDescendingSort,
} from '../../../utils/sort';
import { unique } from '../../../utils/arrayHelper';

export const FileStringOperations = ({ content, onChange }) => {
  const [selectedDelimiter, setSelectedDelimiter] = useState('\n');
  console.log('selectedDelimiter', selectedDelimiter === '\n')
  return (
    <div className="flex--vertical">
      <div className='file-operation-delimiter'>
        <label>Delimiter:</label>
        <button className={`file-operations-delimiter-btn ${selectedDelimiter === ',' ? 'file-operations-delimiter-btn__active' : ''} `} onClick={() => setSelectedDelimiter(',')}>comma</button>
        <button className={`file-operations-delimiter-btn ${selectedDelimiter === '\n' ? 'file-operations-delimiter-btn__active' : ''}`} onClick={() => setSelectedDelimiter('\n')}>newline</button>
        <button className={`file-operations-delimiter-btn ${selectedDelimiter === ' ' ? 'file-operations-delimiter-btn__active' : ''} `} onClick={() => setSelectedDelimiter(' ')}>space</button>
      </div>
      <div className='file-operation-group-wrapper'>
        <div className='file-operation-group'>
          <button
            className='file-operations-btn'
            onClick={() => {
              onChange(content.split(selectedDelimiter).join('\n'));
            }}
          >
            Split
          </button>
          <button
            className='file-operations-btn'
            onClick={() => {
              onChange(content.split('\n').join(selectedDelimiter));
            }}
          >
            Join
          </button>
        </div>
        <div className='file-operation-group'>
          <button
            className='file-operations-btn'
            onClick={() => {
              onChange(content.replace(/\n|\t|\r/gm, '').replace(/[ ]{1,}/gm, ''));
            }}
          >
            Remove Spaces
          </button>
          <button
            className='file-operations-btn'
            onClick={() => {
              onChange(content.replace(/\n|\t|\r/gm, ' ').replace(/[ ]{2,}/gm, ' '));
            }}
          >
            Minify
          </button>
          <button
            className='file-operations-btn'
            onClick={() => {
              onChange(unique(content.split(selectedDelimiter)).join(selectedDelimiter));
            }}
          >
            Remove Duplicates
          </button>
        </div>
        <div className='file-operation-group'>
          <button
            className='file-operations-btn'
            onClick={() => {
              onChange(alphaAscendingSort(content.split(selectedDelimiter)).join(selectedDelimiter));
            }}
          >
            Sort Asc
          </button>
          <button
            className='file-operations-btn'
            onClick={() => {
              onChange(alphaDescendingSort(content.split(selectedDelimiter)).join(selectedDelimiter));
            }}
          >
            Sort Desc
          </button>
          <button
            className='file-operations-btn'
            onClick={() => {
              onChange(numericAscendingSort(content.split(selectedDelimiter)).join(selectedDelimiter));
            }}
          >
            Sort Number Asc
          </button>
          <button
            className='file-operations-btn'
            onClick={() => {
              onChange(numericDescendingSort(content.split(selectedDelimiter)).join(selectedDelimiter));
            }}
          >
            Sort Number Desc
          </button>
        </div>
      </div>
    </div>
  );
};
