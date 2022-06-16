import React from 'react';
import { isNumber } from 'utils/type-check';

const ZERO = 0;

const isValidNumberRange = (selected, range) => {
  const start = Number(selected.start);
  const end = Number(selected.end);
  if (!isNumber(start) || !isNumber(end)) {
    return false;
  }
  if (start > end || start < range.min || end > range.max) {
    return false;
  }

  return true;
};

const NumberRange = ({ id, label, selected = {}, min = ZERO, max = ZERO, error, onChange }) => {
  const handleSelectedStartChange = ({ target: { value } }) => {
    const hasError = !isValidNumberRange({ start: value, end: selected.end }, { min, max });

    onChange({ id, selected: { start: value, end: selected.end }, error: hasError });
  };

  const handleSelectedEndChange = ({ target: { value } }) => {
    const hasError = !isValidNumberRange({ start: selected.start, end: value }, { min, max });

    onChange({ id, selected: { start: selected.start, end: value }, error: hasError });
  };

  return (
    <div>
      <div>
        {label && <label className="input__label">{label}</label>}
        <input
          className="number-range__field"
          type="text"
          aria-label={`${label} number range start`}
          value={selected.start}
          onChange={handleSelectedStartChange}
        />
        <input
          className="number-range__field"
          type="text"
          aria-label={`${label} number range end`}
          value={selected.end}
          onChange={handleSelectedEndChange}
        />
      </div>
      {error && (
        <span className="input__error">
          Please enter values ranging at mininum {min} to maximum {max}
        </span>
      )}
    </div>
  );
};

export default NumberRange;
