import React, { useRef, useState } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { LS_TIMERS_KEY, LS_CLIPBOARD_KEY } from '../../../constants/localstorage';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useCountdown } from '../../../hooks/useDisplayCountdown';
import { getFormattedDate } from '../../../utils/clock';
import './quick-access.css';

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

export const QuickAccess = () => {
    const [isActive, setIsActive] = useState(false);
    const quicktimerRef = useRef();
    useOnClickOutside(quicktimerRef, () => setIsActive(false));
    const [timers] = useLocalStorage(LS_TIMERS_KEY, [], true);
    const [clipboard] = useLocalStorage(LS_CLIPBOARD_KEY, [], true);

    return (
        <div ref={quicktimerRef}
            className={`quick-access-container ${isActive ? 'quick-access-container__active' : ''}`}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
        >
            {isActive ?
                <div className='quick-access-body'>
                    <div className='quick-access-copy-list'>
                        {timers.length > 0 ? <div className='quick-access-title'>Timers</div> : null}
                        {timers.map(t => {
                            return (
                                <div key={t.description}>
                                    <Countdown description={t.description} endDate={getCountdownDate(t.targetDate, t.time)} />
                                </div>
                            )
                        })}
                        {clipboard.length > 0 ? <div className='quick-access-title'>Clipboard</div> : null}
                        {clipboard.map((item) => {
                            return (
                                <button
                                    key={item.label}
                                    className='quick-access-copy-btn'
                                    onClick={() => {
                                        copyToClipboard(item.value);
                                    }}
                                >
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div> :
                <div className={getFormattedDate().week > SINGLE_DIGIT ? 'quick-access-week' : 'quick-access-week quick-access-week__single'}>
                    {getFormattedDate().week}
                </div>
            }
        </div>
    );
};
