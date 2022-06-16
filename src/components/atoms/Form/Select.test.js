import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Select from './Select';

const defaultProps = {
  id: 1,
  label: 'test-label',
  values: [
    { label: 's1', selected: true },
    { label: 's2', selected: false }
  ],
  onChange: jest.fn()
};

describe('Select', () => {
  it('checks an item', () => {
    simpleTestWrapper(Select, defaultProps);
    const expectedResult = {
      id: 1,
      values: [
        { label: 's1', selected: false },
        { label: 's2', selected: true }
      ]
    };

    fireEvent.change(screen.queryByTestId('select-test-label'), {
      target: { value: 's2' }
    });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});
