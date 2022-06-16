import React, { useState } from 'react';
import Radio from 'components/atoms/Form/Radio';
import { FileStringOperations } from 'components/molecules/FileStringOperations';
import { FileJsonOperations } from 'components/molecules/FileJsonOperations';
import { FileRegexOperations } from 'components/molecules/FileRegexOperations';
import { OPERATION_TYPES } from './helper';

const ZERO = 0;
const ONE = 1;
const TWO = 2;

export const FileOperations = ({ content, onChange }) => {
  const [ops, setOps] = useState(OPERATION_TYPES);
  const selectedOp = ops.find((item) => item.selected).value;

  return (
    <div className="container--center">
      <Radio
        label="Select Operation"
        horizontal
        values={ops}
        onChange={({ values }) => {
          setOps(values);
        }}
      />
      {selectedOp === ZERO && <FileStringOperations content={content} onChange={onChange} />}
      {selectedOp === ONE && <FileJsonOperations content={content} onChange={onChange} />}
      {selectedOp === TWO && <FileRegexOperations content={content} onChange={onChange} />}
    </div>
  );
};
