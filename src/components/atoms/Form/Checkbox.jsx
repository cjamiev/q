import React from 'react';

const Checkbox = ({ id, label, horizontal, values, onChange }) => {
  const handleChange = (selectedLabel, currentValues) => {
    const updatedValues = currentValues.map((item) => {
      if (item.label === selectedLabel) {
        return {
          ...item,
          selected: !item.selected
        };
      }

      return item;
    });

    onChange({ id, values: updatedValues });
  };
  const className = horizontal ? 'input--horizontal' : '';

  const checkboxes = values.map((item) => {
    const ariaLabel = item.selected
      ? `${item.label} checkbox option is selected`
      : `${item.label} checkbox option is not selected`;

    return (
      <div key={item.label} className="input__item-container">
        <input
          className="input__item-field"
          type="checkbox"
          name={item.label}
          value={item.label}
          aria-label={ariaLabel}
          onChange={() => {
            handleChange(item.label, values);
          }}
          checked={item.selected}
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
      {checkboxes}
    </div>
  );
};

export default Checkbox;
