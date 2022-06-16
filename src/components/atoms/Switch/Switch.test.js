import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Switch from './Switch';

const ONE = 1;

const defaultProps = {
  data: [{ label: 'test1' }, { label: 'test2' }],
  switchIndex: 0,
  onToggleSwitch: jest.fn()
};

describe('Switch', () => {
  it('checks behavior', () => {
    simpleTestWrapper(Switch, defaultProps);

    const switchTwo = screen.getByText('test2');
    fireEvent.click(switchTwo);

    expect(defaultProps.onToggleSwitch).toHaveBeenCalledWith(ONE);
  });
});
