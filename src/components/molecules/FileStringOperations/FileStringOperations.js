import React, { useState } from 'react';
import Dropdown from 'components/atoms/Form/Dropdown';
import Button from 'components/atoms/Button';
import { sortByDelimiter, sortDescendingByDelimiter } from 'utils/sort';
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
          label="Sort Asc"
          onClick={() => {
            onChange(sortByDelimiter(content, selectedDelimiter.value));
          }}
        />
        <Button
          isSecondary
          label="Sort Desc"
          onClick={() => {
            onChange(sortDescendingByDelimiter(content, selectedDelimiter.value));
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
          label="Trim"
          onClick={() => {
            onChange(content.replace(/\n|\t|\r/gm, '').replace(/[ ]{2,}/gm, ' '));
          }}
        />
      </SCFileBtnWrapper>
    </div>
  );
};
