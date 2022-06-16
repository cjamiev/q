import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Calendar from './Calendar';

const defaultProps = {
  id: 1,
  label: 'test-label',
  selected: '2021-01-01',
  onChange: jest.fn()
};

describe('Calendar', () => {
  it('handle date change', () => {
    simpleTestWrapper(Calendar, defaultProps);
    const input = screen.queryByLabelText(`${defaultProps.label} calendar field`);
    const expectedResult = { id: 1, selected: '2021-01-02' };

    fireEvent.change(input, { target: { value: '2021-01-02' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});
