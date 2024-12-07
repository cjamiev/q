import React from 'react';
import { copyToClipboard } from 'utils/copy';
import { getReactCode } from './exportHelper';
import { SCNewFieldSection, SCAddedFieldsWrapper, SCNewFieldBtnWrapper } from './styles';
import { RandomType } from './types';

const AMOUNT_TWO = 2;

export const FieldSection = ({
  columns,
  onHandleAddField,
  onHandleRemoveField,
  onHandleColumnNameChange,
  onHandleColumnOptionsChange,
  onHandleBuiltInOptionsChange,
  onHandleDataTypeChange,
  onHandleFormTypeChange
}) => {
  return (
    <SCNewFieldSection>
      <SCNewFieldBtnWrapper>
        {Object.keys(RandomType)
          .filter((item) => !columns.some((element) => element.randomType === RandomType[item]))
          .map((type) => {
            return (
              <button
                key={type}
                onClick={() => {
                  onHandleAddField(RandomType[type]);
                }}
              >
                {RandomType[type]}
              </button>
            );
          })}
      </SCNewFieldBtnWrapper>
      <SCAddedFieldsWrapper>
        {columns.map((item, index) => {
          return (
            <div key={item.randomType}>
              <input
                type="text"
                onChange={(event) => {
                  onHandleColumnNameChange(event, index);
                }}
                value={item.variableName}
              />
              <input
                type="text"
                disabled={
                  item.randomType !== RandomType.CUSTOM_STATE &&
                  item.randomType !== RandomType.CUSTOM_STRING &&
                  item.randomType !== RandomType.GENDER
                }
                onChange={(event) => {
                  onHandleColumnOptionsChange(event, index);
                }}
                value={item.userOptions}
              />
              <span>{item.randomType}</span>
              <select
                disabled={item.builtInOptions.length < AMOUNT_TWO}
                onChange={(event) => onHandleBuiltInOptionsChange(event, index)}
              >
                {item.builtInOptions.map((op) => {
                  return (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  );
                })}
              </select>
              <select
                disabled={item.dataType.length < AMOUNT_TWO}
                onChange={(event) => onHandleDataTypeChange(event, index)}
              >
                {item.dataType.map((op) => {
                  return (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  );
                })}
              </select>
              <select
                disabled={item.formType.length < AMOUNT_TWO}
                onChange={(event) => onHandleFormTypeChange(event, index)}
              >
                {item.formType.map((op) => {
                  return (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  );
                })}
              </select>
              {columns.length >= AMOUNT_TWO && (
                <button
                  onClick={() => {
                    onHandleRemoveField(index);
                  }}
                >
                  Delete
                </button>
              )}
              <button onClick={() => copyToClipboard(getReactCode(item))}>Get React Code</button>
            </div>
          );
        })}
      </SCAddedFieldsWrapper>
    </SCNewFieldSection>
  );
};
