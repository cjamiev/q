import React, { useState, useRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import useOnClickOutside from './useOnClickOutside';

const TestComponent = () => {
  const ref = useRef();
  const [show, setShow] = useState(false);
  useOnClickOutside(ref, () => setShow(false));

  return (
    <div>
      <div
        ref={ref}
        onClick={() => {
          setShow(!show);
        }}
      >
        button
      </div>
      {show && <span> toggle </span>}
      <div>outside</div>
    </div>
  );
};

describe('useOnClickOutside', () => {
  it('Should detect clicked outside', () => {
    render(<TestComponent />);

    expect(screen.queryByText('toggle')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('button'));

    expect(screen.queryByText('toggle')).toBeInTheDocument();

    fireEvent.click(screen.getByText('outside'));
    expect(screen.queryByText('toggle')).not.toBeInTheDocument();
  });
});
