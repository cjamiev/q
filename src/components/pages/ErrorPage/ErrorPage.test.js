import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import ErrorPage from './ErrorPage';

const pathname = '/error';
const ZERO = 0;

describe('ErrorPage', () => {
  it('handles go back', () => {
    reduxTestWrapper(ErrorPage, {}, {}, pathname);

    expect(screen.queryByText('404 Page Not Found')).toBeInTheDocument();
  });
});
