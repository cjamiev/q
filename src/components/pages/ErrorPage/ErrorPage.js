import React from 'react';
import Button from 'components/atoms/Button';
import { useNavigate } from 'react-router-dom';

const PREVIOUS_INDEX = -1;

const ErrorPage = React.memo(() => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404 Page Not Found</h1>
      <Button
        label="Go back to previous page"
        isPrimary
        onClick={() => {
          navigate(PREVIOUS_INDEX);
        }}
      />
    </div>
  );
});

export default ErrorPage;
