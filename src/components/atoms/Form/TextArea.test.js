import { fireEvent } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import TextArea from './TextArea';

const TWO = 2;
const defaultProps = {
  id: 1,
  label: 'test-label',
  jsonType: true,
  selected: '{}',
  error: false,
  errorMessage: 'Please enter valid json',
  onChange: jest.fn()
};

describe('TextArea', () => {
  it('valid json', () => {
    const { getByLabelText } = simpleTestWrapper(TextArea, defaultProps);
    const input = getByLabelText(`${defaultProps.label} text area`);
    const expectedResult = {
      id: 1,
      selected: JSON.stringify({ testing: 123 }, undefined, TWO),
      error: false,
      errorMessage: defaultProps.errorMessage
    };

    fireEvent.change(input, { target: { value: '{"testing":123}' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });

  it('invalid json', () => {
    const { getByLabelText } = simpleTestWrapper(TextArea, defaultProps);
    const input = getByLabelText(`${defaultProps.label} text area`);
    const expectedResult = { id: 1, selected: 'abc', error: true, errorMessage: defaultProps.errorMessage };

    fireEvent.change(input, { target: { value: 'abc' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});
