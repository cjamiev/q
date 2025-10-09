import React, { useRef, useState } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { LS_TIMERS_KEY } from '../../../constants/localstorage';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useCountdown } from '../../../hooks/useDisplayCountdown';
import { getFormattedDate } from '../../../utils/clock';
import './quick-timer.css';

const SINGLE_DIGIT = 9;

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

export const QuickTimer = () => {
    const [isActive, setIsActive] = useState(false);
    const quicktimerRef = useRef();
    useOnClickOutside(quicktimerRef, () => setIsActive(false));
    const [timers] = useLocalStorage(LS_TIMERS_KEY, [], true);

    return (
        <div ref={quicktimerRef} className={`quick-timer-container ${isActive ? 'quick-timer-container__active' : ''}`} onClick={() => setIsActive(!isActive)}>
            {isActive ?
                <div className='quick-timer-body'>
                    <div className='quick-timer-copy-list'>
                        {timers.map(t => {
                            return (
                                <div key={t.description}>
                                    <Countdown description={t.description} endDate={getCountdownDate(t.targetDate, t.time)} />
                                </div>
                            )
                        })}
                    </div>
                </div> :
                <div className={getFormattedDate().week > SINGLE_DIGIT ? 'quick-timer-week' : 'quick-timer-week quick-timer-week__single'}>
                    {getFormattedDate().week}
                </div>}
        </div>
    );
};
