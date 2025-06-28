import React from 'react';

const Radio = ({ id, label, horizontal = false, values, onChange }) => {
  const handleChange = (selectedLabel, currentValues) => {
    const updatedValues = currentValues.map((item) => {
      if (item.label === selectedLabel) {
        return {
          ...item,
          selected: true
        };
      }

      return {
        ...item,
        selected: false
      };
    });

    onChange({ id, values: updatedValues });
  };
  const className = horizontal ? 'input--horizontal' : '';

  const radios = values.map((item) => {
    const ariaLabel = item.selected
      ? `${item.label} radio option is selected`
      : `${item.label} radio option is not selected`;

    return (
      <div key={item.label} className="input__item-container">
        <input
          className="input__item-field"
          type="radio"
          name={label}
          value={item.label}
          checked={item.selected}
          aria-label={ariaLabel}
          onChange={() => {
            handleChange(item.label, values);
          }}
        />
        <label
          className="input__item-label"
          onClick={() => {
            handleChange(item.label, values);
          }}
        >
          {item.label}
        </label>
      </div>
    );
  });

  return (
    <div className={className}>
      <label className="input__label">{label}</label>
      {radios}
    </div>
  );
};

export default Radio;
