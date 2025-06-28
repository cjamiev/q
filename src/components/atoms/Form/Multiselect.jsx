import React from 'react';

const divStyle = {
  width: '200px'
};

const labelStyle = {
  display: 'block'
};

const multiselectStyle = {
  margin: '10px 0',
  overflow: 'auto',
  width: '200px'
};

const Multiselect = ({ id, label, values, onChange }) => {
  const handleChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    const updatedValues = values.map((item) => {
      if (selectedOptions.find((option) => option === item.label)) {
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

  const getOptions = values.map((item) => (
    <option key={item.label} value={item.label}>
      {item.label}
    </option>
  ));

  const selected = values.filter((item) => item.selected).map((item) => item.label);

  return (
    <div style={divStyle}>
      <label style={labelStyle}>{label}</label>
      <select
        data-testid={'multiselect-' + label}
        style={multiselectStyle}
        name="Multiselect"
        multiple
        aria-label="multi-select"
        defaultValue={selected}
        onChange={handleChange}
      >
        {getOptions}
      </select>
    </div>
  );
};

export default Multiselect;
