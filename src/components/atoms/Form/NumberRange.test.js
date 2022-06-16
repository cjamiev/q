import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import NumberRange from './NumberRange';

const defaultProps = {
  id: 1,
  label: 'test-label',
  selected: { start: '', end: '' },
  min: 0,
  max: 10,
  error: false,
  onChange: jest.fn()
};

describe('NumberRange', () => {
  it('handle start', () => {
    simpleTestWrapper(NumberRange, defaultProps);
    const startInput = screen.queryByLabelText(`${defaultProps.label} number range start`);
    const expectedStartResult = { id: 1, selected: { start: '1', end: '' }, error: true };

    fireEvent.change(startInput, { target: { value: '1' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedStartResult);
  });

  it('handle end', () => {
    simpleTestWrapper(NumberRange, defaultProps);
    const endInput = screen.queryByLabelText(`${defaultProps.label} number range end`);
    const expectedEndResult = { id: 1, selected: { start: '', end: '5' }, error: false };

    fireEvent.change(endInput, { target: { value: '5' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedEndResult);
  });

  it('valid range', () => {
    simpleTestWrapper(NumberRange, { ...defaultProps, selected: { start: '1', end: '' } });
    const endInput = screen.queryByLabelText(`${defaultProps.label} number range end`);
    const expectedEndResult = { id: 1, selected: { start: '1', end: '5' }, error: false };

    fireEvent.change(endInput, { target: { value: '5' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedEndResult);
  });

  it('invalid range', () => {
    simpleTestWrapper(NumberRange, { ...defaultProps, selected: { start: '1', end: '' } });
    const endInput = screen.queryByLabelText(`${defaultProps.label} number range end`);
    const expectedEndResult = { id: 1, selected: { start: '1', end: '0' }, error: true };

    fireEvent.change(endInput, { target: { value: '0' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedEndResult);
  });

  it('invalid range with letter', () => {
    simpleTestWrapper(NumberRange, { ...defaultProps, selected: { start: '1', end: '' } });
    const endInput = screen.queryByLabelText(`${defaultProps.label} number range end`);
    const expectedEndResult = { id: 1, selected: { start: '1', end: 'a' }, error: true };

    fireEvent.change(endInput, { target: { value: 'a' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedEndResult);
  });
});
