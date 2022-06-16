import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import { TIME, MONTHS, DAYS_OF_THE_WEEK } from 'constants/time';
import useTimer from './useTimer';

const TestComponent = ({ date }) => {
  const clock = useTimer(date);

  return (
    <div>{`Weeks ${clock.weeks} Days ${clock.days} Hours ${clock.hours} Minutes ${clock.minutes} Seconds ${clock.seconds}`}</div>
  );
};

describe('useTimer', () => {
  it('Wait one second one day from now', () => {
    jest.useFakeTimers();
    act(() => {
      const now = new Date();
      const oneDayFromNow = new Date(now.getTime() + TIME.A_DAY);
      Date.now = jest.fn(() => now);
      render(<TestComponent date={oneDayFromNow} />);
      jest.advanceTimersByTime(TIME.A_SECOND);
    });

    expect(screen.queryByText('Weeks 0 Days 0 Hours 23 Minutes 59 Seconds 59')).toBeInTheDocument();
  });
});
