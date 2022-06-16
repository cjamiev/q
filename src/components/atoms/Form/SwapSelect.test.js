import { fireEvent } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import SwapSelect from './SwapSelect';

const defaultProps = {
  id: 1,
  labelOne: 'test-label-one',
  labelTwo: 'test-label-two',
  listOne: [
    { label: '1', selected: false },
    { label: '2', selected: false }
  ],
  listTwo: [],
  onChange: jest.fn()
};

describe('SwapSelect', () => {
  it('swapRight', () => {
    const { getByTestId, getByText } = simpleTestWrapper(SwapSelect, defaultProps);

    fireEvent.change(getByTestId('multiselect-test-label-one'), {
      target: { value: ['1'] }
    });
    fireEvent.click(getByText('>>'));

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      id: defaultProps.id,
      listOne: [{ label: '2', selected: false }],
      listTwo: [{ label: '1', selected: true }]
    });
  });

  it('swapLeft', () => {
    const updatedProps = {
      ...defaultProps,
      listOne: [],
      listTwo: [
        { label: '1', selected: false },
        { label: '2', selected: false }
      ]
    };
    const { getByTestId, getByText } = simpleTestWrapper(SwapSelect, updatedProps);

    fireEvent.change(getByTestId('multiselect-test-label-two'), {
      target: { value: ['2'] }
    });
    fireEvent.click(getByText('<<'));

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      id: defaultProps.id,
      listOne: [{ label: '2', selected: true }],
      listTwo: [{ label: '1', selected: false }]
    });
  });
});
