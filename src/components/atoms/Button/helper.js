export const getColor = (classColor) => {
  if (classColor === 'primary') {
    return ' btn--primary';
  } else if (classColor === 'secondary') {
    return ' btn--secondary';
  } else if (classColor === 'success') {
    return ' btn--success';
  } else if (classColor === 'info') {
    return ' btn--info';
  } else if (classColor === 'warning') {
    return ' btn--warning';
  } else if (classColor === 'error') {
    return ' btn--error';
  } else if (classColor === 'inherit') {
    return ' btn--inherit';
  }
  return '';
};

export const getSize = (isSmall) => {
  return isSmall ? ' btn--small' : '';
};
