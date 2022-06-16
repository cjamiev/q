import React from 'react';

const Range = ({ id, label, horizontal = false, min, max, selected = '', onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {
    onChange({ id, selected: value });
  };

  const ariaLabel = selected ? `${label} range field has value ${selected}` : `${label} range field`;
  const className = horizontal ? 'input--horizontal' : '';

  return (
    <div>
      <div className={className}>
        <label className="input__label">{label}</label>
        <input
          className="input__item-field"
          type="range"
          name={label}
          aria-label={ariaLabel}
          min={min}
          max={max}
          value={selected}
          onChange={handleSelectedChange}
        />
      </div>
    </div>
  );
};

export default Range;
