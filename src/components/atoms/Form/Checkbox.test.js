import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Checkbox from './Checkbox';

const ONE = 1;
const defaultProps = {
  id: 1,
  label: 'test-label',
  values: [
    { label: 'ck1', selected: true },
    { label: 'ck2', selected: false }
  ],
  onChange: jest.fn()
};

describe('Checkbox', () => {
  it('checks an item by label', () => {
    simpleTestWrapper(Checkbox, defaultProps);
    const expectedResult = {
      id: 1,
      values: [
        { label: 'ck1', selected: true },
        { label: 'ck2', selected: true }
      ]
    };

    fireEvent.click(screen.getByText('ck2'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });

  it('checks an item by checkbox', () => {
    simpleTestWrapper(Checkbox, defaultProps);
    const expectedResult = {
      id: 1,
      values: [
        { label: 'ck1', selected: true },
        { label: 'ck2', selected: true }
      ]
    };

    fireEvent.click(screen.getByLabelText(`${defaultProps.values[ONE].label} checkbox option is not selected`));

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });

  it('unchecks an item by label', () => {
    const { getByText } = simpleTestWrapper(Checkbox, defaultProps);
    const expectedResult = {
      id: 1,
      values: [
        { label: 'ck1', selected: false },
        { label: 'ck2', selected: false }
      ]
    };

    fireEvent.click(getByText('ck1'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});
