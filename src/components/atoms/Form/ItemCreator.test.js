import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import ItemCreator from './ItemCreator';

const ONE = 1;
const defaultProps = {
  data: ['one', 'two', 'three'],
  placeholder: 'Item',
  onChange: jest.fn()
};

describe('ItemCreator', () => {
  it('Handle form', () => {
    simpleTestWrapper(ItemCreator, defaultProps);
    const itemField = screen.getByLabelText('Item text field');

    expect(screen.queryByText('one')).toBeInTheDocument();
    expect(screen.queryByText('two')).toBeInTheDocument();
    expect(screen.queryByText('three')).toBeInTheDocument();

    fireEvent.change(itemField, { target: { value: 'four' } });
    fireEvent.click(screen.getByLabelText('Add Item'));
    expect(screen.queryByText('four')).toBeInTheDocument();
    expect(defaultProps.onChange).toHaveBeenCalledWith(['one', 'two', 'three', 'four']);

    fireEvent.click(screen.getAllByLabelText('Remove Item')[ONE]);
    expect(screen.queryByText('two')).not.toBeInTheDocument();
    expect(defaultProps.onChange).toHaveBeenCalledWith(['one', 'three', 'four']);
  });
});
