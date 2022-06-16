import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import TimerForm from './TimerForm';

const ZERO = 0;
const ONE = 1;
const FOUR = 4;
const TWELVE = 12;
const SIXTEEN = 16;

const today = new Date();
const isAmMode = today.getHours() - TWELVE < ZERO;
const defaultProps = {
  onChange: jest.fn(),
  value: {
    name: 'test',
    time: today
  }
};

describe('TimerForm', () => {
  it('Handle form', () => {
    simpleTestWrapper(TimerForm, defaultProps);

    const nameField = screen.getByLabelText('Name text field');
    const monthField = screen.getByLabelText('Month text field');
    const dayField = screen.getByLabelText('Day text field');
    const yearField = screen.getByLabelText('Year text field');
    const hourField = screen.getByLabelText('Hour text field');
    const minuteField = screen.getByLabelText('Minute text field');
    const secondField = screen.getByLabelText('Second text field');
    const saveBtn = screen.getByText('Submit');

    fireEvent.change(nameField, { target: { value: 'Timer1' } });
    fireEvent.change(monthField, { target: { value: '1' } });
    fireEvent.change(dayField, { target: { value: '2' } });
    fireEvent.change(yearField, { target: { value: '3' } });
    fireEvent.change(hourField, { target: { value: '4' } });
    fireEvent.change(minuteField, { target: { value: '5' } });
    fireEvent.change(secondField, { target: { value: '6' } });
    fireEvent.click(saveBtn);

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      name: 'Timer1',
      content: { month: 1, day: 2, year: 3, hour: isAmMode ? FOUR : SIXTEEN, minute: 5, second: 6 }
    });
  });

  it('Handle form with am/pm mode', () => {
    simpleTestWrapper(TimerForm, defaultProps);

    const nameField = screen.getByLabelText('Name text field');
    const monthField = screen.getByLabelText('Month text field');
    const dayField = screen.getByLabelText('Day text field');
    const yearField = screen.getByLabelText('Year text field');
    const hourField = screen.getByLabelText('Hour text field');
    const minuteField = screen.getByLabelText('Minute text field');
    const secondField = screen.getByLabelText('Second text field');
    const ampmSwitch = isAmMode ? screen.getByLabelText('pm mode is off') : screen.queryByLabelText('am mode is off');
    const saveBtn = screen.getByText('Submit');

    fireEvent.change(nameField, { target: { value: 'Timer1' } });
    fireEvent.change(monthField, { target: { value: '1' } });
    fireEvent.change(dayField, { target: { value: '2' } });
    fireEvent.change(yearField, { target: { value: '3' } });
    fireEvent.change(hourField, { target: { value: '4' } });
    fireEvent.change(minuteField, { target: { value: '5' } });
    fireEvent.change(secondField, { target: { value: '6' } });
    fireEvent.click(ampmSwitch);
    fireEvent.click(saveBtn);

    expect(defaultProps.onChange).toHaveBeenCalledWith({
      name: 'Timer1',
      content: { month: 1, day: 2, year: 3, hour: isAmMode ? SIXTEEN : FOUR, minute: 5, second: 6 }
    });
  });
});
