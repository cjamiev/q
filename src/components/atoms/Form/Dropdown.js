import React, { useRef, useState } from 'react';
import useOnClickOutside from 'hooks/useOnClickOutside';
import './dropdown.css';

const Dropdown = React.memo(({ id, classNames = { container: '', label: '', content: '', item: ''}, label, values, onChange }) => {
  const ref = useRef();
  const [show, setShow] = useState(false);
  useOnClickOutside(ref, () => setShow(false));

  const handleChange = (selected) => {
    const updatedValues = values.map((item) => {
      if (item.label === selected) {
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

  const renderContent = values.map((item) => {
    const itemClassName = item.selected ? `dropdown__item ${classNames.item} dropdown__item--active` : `dropdown__item ${classNames.item}`;
    const ariaLabel = item.selected
      ? `${item.label} dropdown option is selected`
      : `${item.label} dropdown option is not selected`;

    return (
      <span
        key={item.label}
        aria-label={ariaLabel}
        className={itemClassName}
        onClick={() => {
          handleChange(item.label);
        }}
      >
        {item.label}
      </span>
    );
  });

  const selectedValue = values.find((item) => item.selected) || {};
  const containerClassName = `dropdown ${classNames.container}`;
  const labelClassName = `dropdown__label ${classNames.label}`;
  const contentClassName = `dropdown__content scrollbar ${classNames.content}`;

  return (
    <div
      role="button"
      className={containerClassName}
    >
      <label
        ref={ref}
        className={labelClassName}
        onClick={() => {
          setShow(!show);
        }}
      >
        {label} {selectedValue.label}
      </label>
      {show && <div className={contentClassName}>{renderContent}</div>}
    </div>
  );
});

export default Dropdown;
