import React, { useState } from 'react';
import Button from '../../../components/atoms/Button';
import {
  alphaAscendingSort,
  alphaDescendingSort,
  numericAscendingSort,
  numericDescendingSort,
} from '../../../utils/sort';
import { unique } from '../../../utils/arrayHelper';
import { SCFileBtnWrapper } from './styles';

export const FileStringOperations = ({ content, onChange }) => {
  const [selectedDelimiter, setSelectedDelimiter] = useState('\n');

  return (
    <div className="flex--vertical">
      <h3> String </h3>
      <div style={{ display: 'flex' }}>
        <label>Delimiter:</label>
        <button style={{ background: selectedDelimiter === ',' ? 'red' : 'white', cursor: 'pointer' }} onClick={() => setSelectedDelimiter(',')}>comma</button>
        <button style={{ background: selectedDelimiter === '\n' ? 'red' : 'white', cursor: 'pointer' }} onClick={() => setSelectedDelimiter('\n')}>newline</button>
        <button style={{ background: selectedDelimiter === ' ' ? 'red' : 'white', cursor: 'pointer' }} onClick={() => setSelectedDelimiter(' ')}>space</button>
      </div>
      <SCFileBtnWrapper>
        <Button
          isSecondary
          label="Remove Duplicates"
          onClick={() => {
            onChange(unique(content.split(selectedDelimiter)).join(selectedDelimiter));
          }}
        />
        <Button
          isSecondary
          label="Sort Asc"
          onClick={() => {
            onChange(alphaAscendingSort(content.split(selectedDelimiter)).join(selectedDelimiter));
          }}
        />
        <Button
          isSecondary
          label="Sort Desc"
          onClick={() => {
            onChange(alphaDescendingSort(content.split(selectedDelimiter)).join(selectedDelimiter));
          }}
        />
        <Button
          isSecondary
          label="Sort Number Asc"
          onClick={() => {
            onChange(numericAscendingSort(content.split(selectedDelimiter)).join(selectedDelimiter));
          }}
        />
        <Button
          isSecondary
          label="Sort Number Desc"
          onClick={() => {
            onChange(numericDescendingSort(content.split(selectedDelimiter)).join(selectedDelimiter));
          }}
        />
        <Button
          isSecondary
          label="Split"
          onClick={() => {
            onChange(content.split(selectedDelimiter).join('\n'));
          }}
        />
        <Button
          isSecondary
          label="Join"
          onClick={() => {
            onChange(content.split('\n').join(selectedDelimiter));
          }}
        />
        <Button
          isSecondary
          label="Remove Spaces"
          onClick={() => {
            onChange(content.replace(/\n|\t|\r/gm, '').replace(/[ ]{1,}/gm, ''));
          }}
        />
        <Button
          isSecondary
          label="Minify"
          onClick={() => {
            onChange(content.replace(/\n|\t|\r/gm, ' ').replace(/[ ]{2,}/gm, ' '));
          }}
        />
      </SCFileBtnWrapper>
    </div>
  );
};
