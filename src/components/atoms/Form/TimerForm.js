import React, { useEffect, useState } from 'react';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Form/Text';
import TextArea from 'components/atoms/Form/TextArea';
import Switch from 'components/atoms/Switch';
import { convert12HourTo24HourClock, convert24HourTo12HourClock } from './helper';
import { incrementDate } from 'utils/clock';
import { PlusSVG } from 'components/atoms/Icons/PlusSVG';
import { MinusSVG } from 'components/atoms/Icons/MinusSVG';
import { SCCreateFormFieldSet, SCTimerQuickModifier } from './styles';

const ZERO = 0;
const ONE = 1;

const TimerForm = ({ legend = 'Add Timer', onChange, value }) => {
  const today = new Date();
  const [name, setName] = useState('');
  const parsedTodayHour = convert24HourTo12HourClock(today.getHours());
  const [month, setMonth] = useState(today.getMonth() + ONE);
  const [day, setDay] = useState(today.getDate());
  const [year, setYear] = useState(today.getFullYear());
  const [hour, setHour] = useState(parsedTodayHour.hour);
  const [minute, setMinute] = useState(today.getMinutes());
  const [second, setSecond] = useState(ZERO);
  const [isPm, setIsPm] = useState(parsedTodayHour.isPm);

  const updateTime = (modifier) => {
    const update = incrementDate(new Date(year, month - ONE, day, hour, minute, second), modifier);

    const parsedHour = convert24HourTo12HourClock(update.getHours());
    setMonth(update.getMonth() + ONE);
    setDay(update.getDate());
    setYear(update.getFullYear());
    setHour(parsedHour.hour);
    setMinute(update.getMinutes());
    setSecond(ZERO);
    setIsPm(parsedHour.isPm);
  };

  useEffect(() => {
    if (value) {
      const parsedHour = convert24HourTo12HourClock(value.time.getHours());
      setName(value.name);
      setMonth(value.time.getMonth() + ONE);
      setDay(value.time.getDate());
      setYear(value.time.getFullYear());
      setHour(parsedHour.hour);
      setMinute(value.time.getMinutes());
      setSecond(ZERO);
      setIsPm(parsedHour.isPm);
    }
  }, [value]);

  return (
    <SCCreateFormFieldSet>
      <legend>{legend}</legend>
      <div>
        <Text
          label="Name"
          selected={name}
          onChange={({ selected }) => {
            setName(selected);
          }}
        />
      </div>
      <div>
        <Text
          label="Month"
          selected={month}
          onChange={({ selected }) => {
            setMonth(selected);
          }}
        />
        <Text
          label="Day"
          selected={day}
          onChange={({ selected }) => {
            setDay(selected);
          }}
        />
        <Text
          label="Year"
          selected={year}
          onChange={({ selected }) => {
            setYear(selected);
          }}
        />
      </div>
      <div>
        <Text
          label="Hour"
          selected={hour}
          onChange={({ selected }) => {
            setHour(selected);
          }}
        />
        <Text
          label="Minute"
          selected={minute}
          onChange={({ selected }) => {
            setMinute(selected);
          }}
        />
        <Text
          label="Second"
          selected={second}
          onChange={({ selected }) => {
            setSecond(selected);
          }}
        />
        <SCTimerQuickModifier>
          <span>Week:</span>
          <PlusSVG
            aria-label="Plus week"
            width="20"
            height="20"
            onClick={() => {
              updateTime({ weeks: ONE });
            }}
          />
          <MinusSVG
            aria-label="Minus week"
            width="20"
            height="20"
            onClick={() => {
              updateTime({ weeks: -ONE });
            }}
          />
        </SCTimerQuickModifier>
        <SCTimerQuickModifier>
          <span>30 Days:</span>
          <PlusSVG
            aria-label="Plus 30 days"
            width="20"
            height="20"
            onClick={() => {
              updateTime({ days: 30 });
            }}
          />
          <MinusSVG
            aria-label="Minus 30 days"
            width="20"
            height="20"
            onClick={() => {
              updateTime({ days: -30 });
            }}
          />
        </SCTimerQuickModifier>
        <Switch
          data={[{ label: 'am' }, { label: 'pm' }]}
          switchIndex={isPm ? ONE : ZERO}
          onToggleSwitch={(index) => {
            setIsPm(Boolean(index));
          }}
        />
      </div>
      <Button
        label="Submit"
        isPrimary
        onClick={() => {
          if (name) {
            const parsedHour = convert12HourTo24HourClock(Number(hour), isPm);
            const timerContent = {
              month: Number(month),
              day: Number(day),
              year: Number(year),
              hour: parsedHour,
              minute: Number(minute),
              second: Number(second)
            };
            onChange({ name, content: timerContent });
            setName('');
          }
        }}
      />
    </SCCreateFormFieldSet>
  );
};

export default TimerForm;
