import React from 'react';
import { getColor, getSize } from './helper';
import { SCButton } from './styles';

const Button = ({ label, ariaLabel, isPrimary, disabled = false, onClick }) => {
  return (
    <SCButton isPrimary={isPrimary} aria-label={ariaLabel} disabled={disabled} onClick={onClick}>
      {label}
    </SCButton>
  );
};

export default Button;
