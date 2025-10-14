import { useState } from 'react';
import { useCountdown } from '../../../../hooks/useDisplayCountdown';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { LS_TIMERS_KEY } from '../../../../constants/localstorage';
import './settings-timer.css';

const now = new Date();
const nowValue = now.toISOString().slice(0, 10);

const Countdown = ({ description, endDate }) => {
  const timeLeft = useCountdown({ endDate });

  return <div>{description + ': ' + timeLeft}</div>;
}

const getCountdownDate = (endDateValue, selectedTime) => {
  const selecteDate = new Date(endDateValue);
  const [hours, minutes] = selectedTime.split(':');
  selecteDate.setUTCHours(hours, minutes, 0, 0)
  const time = selecteDate.getTime() + selecteDate.getTimezoneOffset() * 1000 * 60;

  return new Date(time);
}

export const SettingsTimer = () => {
  const [description, setDescription] = useState('');
  const [endDateValue, setEndDateValue] = useState(nowValue);
  const [selectedTime, setSelectedTime] = useState(now.getHours() + ':' + now.getMinutes());
  const [timers, setTimers] = useLocalStorage(LS_TIMERS_KEY, [], true);

  const handleEndDateChange = ({ target: { value } }) => {
    setEndDateValue(value);
  };

  const handleTimeChange = ({ target: { value } }) => {
    setSelectedTime(value);
  };

  const handleDescriptionChange = ({ target: { value } }) => {
    setDescription(value);
  };

  const addNewTimer = () => {
    setTimers(timers.concat({
      description,
      targetDate: endDateValue,
      time: selectedTime
    }));
  }

  const removeTimer = (d) => {
    setTimers(timers.filter(t => t.description !== d));
  }

  return (
    <div>
      <label>Add Timers</label>
      <div className='settings-timer-new-item'>
        <input type="text" id="description" name="description" value={description} onChange={handleDescriptionChange}></input>
        <input type="date" id="end-date" name="end_date" value={endDateValue} onChange={handleEndDateChange}></input>
        <input type="time" name="selected-time" value={selectedTime} onChange={handleTimeChange}></input>
        <button className='settings-timer-add-btn' onClick={addNewTimer}>Add</button>
      </div>

      {timers.map(t => {
        return (
          <div key={t.description}>
            <Countdown description={t.description} endDate={getCountdownDate(t.targetDate, t.time)} />
            <button onClick={() => removeTimer(t.description)}>Remove</button>
          </div>
        )
      })}
    </div>
  );
};
