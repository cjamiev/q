import React from 'react';
import Page from 'components/layout';
import Button from 'components/atoms/Button';
import { useNavigate } from 'react-router-dom';

const PREVIOUS_INDEX = -1;

const ErrorPage = React.memo(() => {
  const navigate = useNavigate();

  return (
    <Page>
      <Button
        label="Go back to previous page"
        isPrimary
        onClick={() => {
          navigate(PREVIOUS_INDEX);
        }}
      />
    </Page>
  );
});

export default ErrorPage;
