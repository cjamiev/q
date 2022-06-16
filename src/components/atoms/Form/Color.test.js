import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Color, { hexToRGB } from './Color';

const defaultProps = {
  id: 1,
  label: 'test-label',
  selected: '#000000',
  onChange: jest.fn()
};

describe('Color', () => {
  it('handle color change', () => {
    simpleTestWrapper(Color, defaultProps);
    const input = screen.queryByLabelText(`${defaultProps.label} color field has value ${defaultProps.selected}`);
    const expectedResult = { id: 1, selected: '#ffffff' };

    fireEvent.change(input, { target: { value: '#ffffff' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});

describe('hexToRGB', () => {
  it('white', () => {
    expect(hexToRGB('#ffffff')).toEqual({ red: 255, blue: 255, green: 255 });
  });

  it('black', () => {
    expect(hexToRGB('#000000')).toEqual({ red: 0, blue: 0, green: 0 });
  });
});
