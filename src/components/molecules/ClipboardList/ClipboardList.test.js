import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper, reduxTestWrapper } from 'testHelper';
import { incrementDate } from 'utils/clock';
import api from 'api';
import ClipboardList from './ClipboardList';

jest.mock('api');
api.get.mockResolvedValue({
  data: {
    message: 'test message'
  }
});

const ZERO = 0;
const today = new Date();
const getProps = (entry) => {
  return {
    header: 'ClipboardList',
    data: [[entry]]
  };
};

describe('ClipboardList', () => {
  it('invalid type', () => {
    const invalidTypeData = {
      type: 'invalid',
      label: 'invalid-label'
    };
    simpleTestWrapper(ClipboardList, getProps(invalidTypeData));

    expect(screen.queryByText(invalidTypeData.label)).not.toBeInTheDocument();
  });

  it('type link', () => {
    const linkData = {
      type: 'link',
      label: 'cjamiev/playground',
      value: 'https://github.com/cjamiev/playground'
    };
    simpleTestWrapper(ClipboardList, getProps(linkData));

    expect(screen.queryByText(linkData.label)).toBeInTheDocument();
  });

  it('type copy', () => {
    const copyData = {
      type: 'copy',
      label: 'username',
      value: 'cjamiev1836'
    };
    document.execCommand = jest.fn();
    simpleTestWrapper(ClipboardList, getProps(copyData));

    const copyBtn = screen.getByText(copyData.label);
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    fireEvent.click(copyBtn);
    const copyEl = appendChildSpy.mock.calls[ZERO][ZERO];

    expect(document.execCommand).toHaveBeenCalledWith('copy');
    expect(copyEl.value).toEqual(copyData.value);
    expect(screen.queryByText(copyData.label)).toBeInTheDocument();
  });

  it('type text', () => {
    const textData = {
      type: 'text',
      value: 'testing123'
    };
    simpleTestWrapper(ClipboardList, getProps(textData));

    expect(screen.queryByText(textData.value)).toBeInTheDocument();
  });

  it('type command', () => {
    const commandData = {
      type: 'command',
      label: 'test-command',
      value: { name: 'test-filename', showArgs: true }
    };
    const args = '12345';
    reduxTestWrapper(ClipboardList, getProps(commandData));

    const commandInput = screen.queryByLabelText(`args for ${commandData.label}`);
    fireEvent.change(commandInput, { target: { value: args } });

    const commandBtn = screen.getByText(commandData.label);
    fireEvent.click(commandBtn);

    expect(api.get).toHaveBeenCalledWith(`/command?name=${commandData.value.name}&args=${args}`);
    expect(screen.queryByText(commandData.label)).toBeInTheDocument();
  });

  it('type timer - One hour from now', () => {
    const timerOneHourData = {
      type: 'timer',
      label: 'One hour from now',
      value: incrementDate(today, { hours: 1 })
    };
    simpleTestWrapper(ClipboardList, getProps(timerOneHourData));

    expect(screen.queryByText(timerOneHourData.label)).toBeInTheDocument();
  });

  it('type timer - Two days from now', () => {
    const timerTwoDaysData = {
      type: 'timer',
      label: 'Two days from now',
      value: incrementDate(today, { days: 2 })
    };
    simpleTestWrapper(ClipboardList, getProps(timerTwoDaysData));

    expect(screen.queryByText(timerTwoDaysData.label)).toBeInTheDocument();
  });

  it('type timer - Two weeks from now', () => {
    const timerTwoWeeksData = {
      type: 'timer',
      label: 'Two weeks from now',
      value: incrementDate(today, { weeks: 2 })
    };
    simpleTestWrapper(ClipboardList, getProps(timerTwoWeeksData));

    expect(screen.queryByText(timerTwoWeeksData.label)).toBeInTheDocument();
  });
});
