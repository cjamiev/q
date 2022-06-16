import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, mockStore } from 'testHelper';
import CommandForm from './CommandForm';

const ONE = 1;
const defaultProps = {
  onChange: jest.fn()
};

const defaultStoreProps = {
  global: {
    ...mockStore.global,
    commands: ['cmd.bat', 'cmd2.bat']
  }
};

describe('CommandForm', () => {
  it('Handle form', () => {
    reduxTestWrapper(CommandForm, defaultProps, defaultStoreProps);
    const nameField = screen.getByLabelText('Name text field');
    const dropdownField = screen.getByText('Commands');
    const argsYesOption = screen.getByText('Yes');
    const saveBtn = screen.getByText('Save');

    fireEvent.change(nameField, { target: { value: 'Name1' } });
    fireEvent.click(dropdownField);
    fireEvent.click(screen.getByText(defaultStoreProps.global.commands[ONE]));
    fireEvent.click(argsYesOption);
    fireEvent.click(saveBtn);

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      name: 'Name1',
      content: { name: defaultStoreProps.global.commands[ONE], showArgs: true }
    });
  });
});
