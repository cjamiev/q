import React from 'react';

const ZERO = 0;

const isValidText = (value, regex) => {
  if (!value || !regex) {
    return true;
  }

  const match = RegExp(regex).exec(value) || [];

  return match[ZERO] === value;
};

const Text = ({ id, label, horizontal = false, placeholder, selected = '', regex, error, errorMessage, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {
    const hasError = !isValidText(value, regex);

    onChange({ id, selected: value, error: hasError });
  };
  const className = horizontal ? 'input--horizontal' : '';

  return (
    <div>
      <div className={className}>
        {label && <label className="input__label">{label}</label>}
        <input
          className="input__item-field"
          type="text"
          name={label}
          aria-label={`${label || placeholder} text field`}
          placeholder={placeholder}
          value={selected}
          onChange={handleSelectedChange}
        />
      </div>
      {error && <span className="input__error">{errorMessage}</span>}
    </div>
  );
};

export default Text;
