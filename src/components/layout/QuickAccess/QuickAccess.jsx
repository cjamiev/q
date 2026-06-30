import React, { useRef, useState } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { getCountdownDate, Countdown } from '../../pages/Clipboard/Timer/Timer';
import { LS_TIMERS_KEY, LS_CLIPBOARD_KEY } from '../../../constants/localstorage';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { getFormattedDate } from '../../../utils/clock';
import { copyToClipboard } from '../../../utils/copy';

import './quick-access.css';

const SINGLE_DIGIT = 9;
const now = new Date();
const nowValue = now.toISOString().slice(0, 10);

export const QuickAccess = () => {
    const [isActive, setIsActive] = useState(false);
    const quicktimerRef = useRef();
    const [clipboard] = useLocalStorage(LS_CLIPBOARD_KEY, [], true);
    useOnClickOutside(quicktimerRef, () => setIsActive(false));

    return (
        <div ref={quicktimerRef}
            className={`quick-access-container ${isActive ? 'quick-access-container__active' : ''}`}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
        >
            {isActive ?
                <div className='quick-access-body'>
                    <div className='quick-access-copy-list'>
                        <Countdown description={'End of Day'} endDate={getCountdownDate(nowValue, '17:0')} />
                    </div>
                    {clipboard.filter(c => c.isFavorite).map((item) => {
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
                </div> :
                <div className={getFormattedDate().week > SINGLE_DIGIT ? 'quick-access-week' : 'quick-access-week quick-access-week__single'}>
                    {getFormattedDate().week}
                </div>
            }
        </div>
    );
};
