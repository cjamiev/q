import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import ValueForm from './ValueForm';

const defaultProps = {
  type: 'copy',
  onChange: jest.fn()
};

describe('ValueForm', () => {
  it('Handle copy form', () => {
    simpleTestWrapper(ValueForm, defaultProps);
    const nameField = screen.getByLabelText('Name text field');
    const valueField = screen.getByLabelText('Value text area');
    const saveBtn = screen.getByText('Save');

    fireEvent.change(nameField, { target: { value: 'Name1' } });
    fireEvent.change(valueField, { target: { value: 'Value1' } });
    fireEvent.click(saveBtn);

    expect(defaultProps.onChange).toHaveBeenCalledWith({ name: 'Name1', content: 'Value1' });
  });

  it('Handle link form', () => {
    simpleTestWrapper(ValueForm, { ...defaultProps, type: 'link' });
    const nameField = screen.queryByLabelText('Name text field');
    const valueField = screen.queryByLabelText('Value text field');
    const saveBtn = screen.queryByText('Save');

    fireEvent.change(nameField, { target: { value: 'Link1' } });
    fireEvent.change(valueField, { target: { value: 'http://www.link1.com' } });
    fireEvent.click(saveBtn);

    expect(defaultProps.onChange).toHaveBeenCalledWith({ name: 'Link1', content: 'http://www.link1.com' });
  });
});
