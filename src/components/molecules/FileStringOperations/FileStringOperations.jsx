import React, { useState } from 'react';
import Dropdown from '../../../components/atoms/Form/Dropdown';
import Button from '../../../components/atoms/Button';
import {
  alphaAscendingSort,
  alphaDescendingSort,
  numericAscendingSort,
  numericDescendingSort,
} from '../../../utils/sort';
import { unique } from '../../../utils/arrayHelper';
import { DELIMITER_TYPES, MODIFIER_TYPES } from './helper';
import { SCFileBtnWrapper } from './styles';

export const FileStringOperations = ({ content, onChange }) => {
  const [delimiters, setDelimiters] = useState(DELIMITER_TYPES);
  const [modifier, setModifier] = useState(MODIFIER_TYPES);

  const selectedDelimiter = delimiters.find((item) => item.selected);
  const selectedModifiers = modifier
    .filter((item) => item.selected)
    .map((item) => item.value)
    .join('');

  return (
    <div className="flex--vertical">
      <h3> String </h3>
      <Dropdown
        label="Delimiter"
        values={delimiters}
        onChange={({ values }) => {
          setDelimiters(values);
        }}
      />
      <SCFileBtnWrapper>
        <Button
          isSecondary
          label="Remove Duplicates"
          onClick={() => {
            onChange(unique(content.split(selectedDelimiter.value)).join(selectedDelimiter.value));
          }}
        />
        <Button
          isSecondary
          label="Sort Asc"
          onClick={() => {
            onChange(alphaAscendingSort(content.split(selectedDelimiter.value)).join(selectedDelimiter.value));
          }}
        />
        <Button
          isSecondary
          label="Sort Desc"
          onClick={() => {
            onChange(alphaDescendingSort(content.split(selectedDelimiter.value)).join(selectedDelimiter.value));
          }}
        />
        <Button
          isSecondary
          label="Sort Number Asc"
          onClick={() => {
            onChange(numericAscendingSort(content.split(selectedDelimiter.value)).join(selectedDelimiter.value));
          }}
        />
        <Button
          isSecondary
          label="Sort Number Desc"
          onClick={() => {
            onChange(numericDescendingSort(content.split(selectedDelimiter.value)).join(selectedDelimiter.value));
          }}
        />
        <Button
          isSecondary
          label="Split"
          onClick={() => {
            onChange(content.split(selectedDelimiter.value).join('\n'));
          }}
        />
        <Button
          isSecondary
          label="Join"
          onClick={() => {
            onChange(content.split('\n').join(selectedDelimiter.value));
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
