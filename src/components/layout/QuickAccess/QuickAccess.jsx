import React, { useRef, useState } from 'react';
import { copyToClipboard } from '../../../utils/copy';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { LS_CLIPBOARD_KEY } from '../../../constants/localstorage';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import './quick-access.css';

export const QuickAccess = () => {
    const [isActive, setIsActive] = useState(false);
    const quickAccessRef = useRef();
    useOnClickOutside(quickAccessRef, () => setIsActive(false));
    const [clipboard] = useLocalStorage(LS_CLIPBOARD_KEY, [], true);

    return (
        <div ref={quickAccessRef} className={`quick-access-container ${isActive ? 'quick-access-container__active' : ''}`} onClick={() => setIsActive(!isActive)}>
            {isActive ? <div className='quick-access-body'>
                <div className='quick-access-copy-list'>
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
            </div> : null}
        </div>
    );
};
