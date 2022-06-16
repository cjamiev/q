import { fireEvent, screen, waitFor } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Radio from './Radio';

const ONE = 1;
const defaultProps = {
  id: 1,
  label: 'test-label',
  values: [
    { label: 'rb1', selected: true },
    { label: 'rb2', selected: false }
  ],
  onChange: jest.fn()
};

describe('Radio', () => {
  it('click an option', () => {
    simpleTestWrapper(Radio, defaultProps);
    const expectedResult = {
      id: 1,
      values: [
        { label: 'rb1', selected: false },
        { label: 'rb2', selected: true }
      ]
    };

    fireEvent.click(screen.getByText('rb2'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });

  it('checks an item by radio', async () => {
    simpleTestWrapper(Radio, defaultProps);
    const expectedResult = {
      id: 1,
      values: [
        { label: 'rb1', selected: false },
        { label: 'rb2', selected: true }
      ]
    };

    fireEvent.click(screen.getByLabelText(`${defaultProps.values[ONE].label} radio option is not selected`));

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});
