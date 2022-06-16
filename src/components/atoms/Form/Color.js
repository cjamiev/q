import React from 'react';

const INDEX_ONE = 1;
const INDEX_TWO = 2;
const INDEX_THREE = 3;
const INDEX_FOUR = 4;
const INDEX_FIVE = 5;
const INDEX_SIX = 6;
const HEX_CODE = '0x';

export const hexToRGB = (hex) => {
  const red = Number(`${HEX_CODE}${hex[INDEX_ONE]}${hex[INDEX_TWO]}`);
  const green = Number(`${HEX_CODE}${hex[INDEX_THREE]}${hex[INDEX_FOUR]}`);
  const blue = Number(`${HEX_CODE}${hex[INDEX_FIVE]}${hex[INDEX_SIX]}`);

  return { red, green, blue };
};

const Color = ({ id, label, horizontal = false, selected, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {
    onChange({ id, selected: value });
  };

  const ariaLabel = selected ? `${label} color field has value ${selected}` : `${label} color field`;
  const className = horizontal ? 'input--horizontal' : '';

  return (
    <div>
      <div className={className}>
        <label className="input__label">{label}</label>
        <input
          className="input__item-field"
          type="color"
          name={label}
          aria-label={ariaLabel}
          value={selected ? selected : '#000000'}
          onChange={handleSelectedChange}
        />
      </div>
    </div>
  );
};

export default Color;
