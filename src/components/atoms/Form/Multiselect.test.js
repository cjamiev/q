import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Multiselect from './Multiselect';

const defaultProps = {
  id: 1,
  label: 'test-label',
  values: [
    { label: 'ms1', selected: true },
    { label: 'ms2', selected: false }
  ],
  onChange: jest.fn()
};

describe('Multiselect', () => {
  it('checks an item', () => {
    simpleTestWrapper(Multiselect, defaultProps);
    const expectedResult = {
      id: 1,
      values: [
        { label: 'ms1', selected: false },
        { label: 'ms2', selected: true }
      ]
    };

    fireEvent.change(screen.queryByTestId('multiselect-test-label'), {
      target: { value: ['ms2'] }
    });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});
