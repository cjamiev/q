import React from 'react';
import { SCButton } from './styles';

const Button = ({ label, ariaLabel, isprimary, disabled = false, onClick }) => {
  return (
    <SCButton isprimary={isprimary ? 'true' : undefined} aria-label={ariaLabel} disabled={disabled} onClick={onClick}>
      {label}
    </SCButton>
  );
};

export default Button;
