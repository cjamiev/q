import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Dropdown from './Dropdown';

const ZERO = 0;
const defaultProps = {
  id: 1,
  label: 'Dropdown',
  values: [
    { label: 'item1', selected: false },
    { label: 'item2', selected: false }
  ],
  onChange: jest.fn()
};

describe('Dropdown', () => {
  it('click on item', () => {
    simpleTestWrapper(Dropdown, defaultProps);

    expect(screen.queryByText(defaultProps.values[ZERO].label)).not.toBeInTheDocument();

    const dropdownBtn = screen.getByText('Dropdown');
    fireEvent.click(dropdownBtn);

    const itemOne = screen.getByText(defaultProps.values[ZERO].label);
    fireEvent.click(itemOne);
    expect(defaultProps.onChange).toHaveBeenCalledWith({
      id: defaultProps.id,
      values: [
        { label: 'item1', selected: true },
        { label: 'item2', selected: false }
      ]
    });
  });
});
