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

  return (
    <div className="flex--vertical">
      <div style={{ display: 'flex' }}>
        <label>Delimiter:</label>
        <button style={{ background: selectedDelimiter === ',' ? 'red' : 'white', cursor: 'pointer' }} onClick={() => setSelectedDelimiter(',')}>comma</button>
        <button style={{ background: selectedDelimiter === '\n' ? 'red' : 'white', cursor: 'pointer' }} onClick={() => setSelectedDelimiter('\n')}>newline</button>
        <button style={{ background: selectedDelimiter === ' ' ? 'red' : 'white', cursor: 'pointer' }} onClick={() => setSelectedDelimiter(' ')}>space</button>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button
            onClick={() => {
              onChange(content.split(selectedDelimiter).join('\n'));
            }}
          >
            Split
          </button>
          <button
            onClick={() => {
              onChange(content.split('\n').join(selectedDelimiter));
            }}
          >
            Join
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>

          <button
            onClick={() => {
              onChange(content.replace(/\n|\t|\r/gm, '').replace(/[ ]{1,}/gm, ''));
            }}
          >
            Remove Spaces
          </button>
          <button
            onClick={() => {
              onChange(content.replace(/\n|\t|\r/gm, ' ').replace(/[ ]{2,}/gm, ' '));
            }}
          >
            Minify
          </button>
          <button
            onClick={() => {
              onChange(unique(content.split(selectedDelimiter)).join(selectedDelimiter));
            }}
          >
            Remove Duplicates
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button
            onClick={() => {
              onChange(alphaAscendingSort(content.split(selectedDelimiter)).join(selectedDelimiter));
            }}
          >
            Sort Asc
          </button>
          <button
            onClick={() => {
              onChange(alphaDescendingSort(content.split(selectedDelimiter)).join(selectedDelimiter));
            }}
          >
            Sort Desc
          </button>
          <button
            onClick={() => {
              onChange(numericAscendingSort(content.split(selectedDelimiter)).join(selectedDelimiter));
            }}
          >
            Sort Number Asc
          </button>
          <button
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
