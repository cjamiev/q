import React from 'react';

const Calendar = ({ id, label, selected, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {
    onChange({ id, selected: value });
  };

  return (
    <div>
      <label className="input__label">{label}</label>
      <div className="input__item-container">
        <input
          className="input__item-field"
          type="date"
          name={label}
          value={selected}
          aria-label={`${label} calendar field`}
          onChange={handleSelectedChange}
        />
      </div>
    </div>
  );
};

export default Calendar;
