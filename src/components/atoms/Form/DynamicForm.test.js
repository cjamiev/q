import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import DynamicForm, { hasError, updateData } from './DynamicForm';

describe('hasError', () => {
  it('empty', () => {
    expect(hasError([])).toBeFalsy();
  });

  it('no error', () => {
    expect(hasError([{ required: true, selected: '123' }])).toBeFalsy();
  });

  it('no error', () => {
    expect(hasError([{ required: true, values: [{ selected: '123' }] }])).toBeFalsy();
  });

  it('error', () => {
    expect(hasError([{ error: true }])).toBeTruthy();
  });

  it('error - required selected', () => {
    expect(hasError([{ required: true, selected: '' }])).toBeTruthy();
  });

  it('error - required values', () => {
    expect(hasError([{ required: true, values: [{ selected: '' }] }])).toBeTruthy();
  });
});

describe('updateData', () => {
  const item = {
    id: 1,
    type: 'text',
    label: 'Text1',
    orderSeq: 1
  };

  it('update selected value', () => {
    expect(updateData([item], { id: 1, selected: 'testing' })).toEqual([{ ...item, selected: 'testing' }]);
  });

  it('no change', () => {
    expect(updateData([item], { id: 2, selected: 'testing' })).toEqual([item]);
  });
});
