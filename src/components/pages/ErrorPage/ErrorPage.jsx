import React from 'react';
import Page from '../../../components/layout';
import { useNavigate } from 'react-router-dom';

const PREVIOUS_INDEX = -1;

const ErrorPage = React.memo(() => {
  const navigate = useNavigate();

  return (
    <Page>
      <button
        onClick={() => {
          navigate(PREVIOUS_INDEX);
        }}
      >
        Go back to previous page
      </button>
    </Page>
  );
});

export default ErrorPage;
