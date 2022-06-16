import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Text from './Text';

const defaultProps = {
  id: 1,
  label: 'test-label',
  regex: '[0-9]+',
  error: false,
  errorMessage: 'Please enter a valid number',
  onChange: jest.fn()
};

describe('Text', () => {
  it('valid text', () => {
    simpleTestWrapper(Text, defaultProps);
    const input = screen.getByLabelText(`${defaultProps.label} text field`);
    const expectedResult = { id: 1, selected: '123', error: false };

    fireEvent.change(input, { target: { value: '123' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });

  it('invalid text', () => {
    simpleTestWrapper(Text, defaultProps);
    const input = screen.queryByLabelText(`${defaultProps.label} text field`);
    const expectedResult = { id: 1, selected: 'abc', error: true };

    fireEvent.change(input, { target: { value: 'abc' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});
