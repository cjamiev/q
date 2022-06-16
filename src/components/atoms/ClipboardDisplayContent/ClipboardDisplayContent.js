import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { copyToClipboard } from 'utils/copy';
import { executeCommand } from 'components/molecules/Global/globalActions';
import Button from 'components/atoms/Button';
import { TYPE } from 'constants/type';
import { formattedTimerClock } from 'utils/clock';
import useTimer from 'hooks/useTimer';

const ONE = 1;

const getFormattedTime = ({ weeks, days, hours, minutes, seconds }) => {
  if (weeks > ONE) {
    return `${weeks} Weeks`;
  } else if (days > ONE) {
    return `${days} Days`;
  }

  return formattedTimerClock(hours, minutes, seconds);
};

const ClipboardDisplayTimer = ({ label, value }) => {
  const time = useTimer(new Date(value));

  return (
    <span className="list__item">
      <label className="list__timer-label" title={value}>
        {label}
      </label>
      <span data-testid={`${label} time`}>{getFormattedTime(time)}</span>
    </span>
  );
};

const ClipboardDisplayCommand = ({ label, name, showArgs }) => {
  const dispatch = useDispatch();
  const [arg, setArg] = useState('');

  const handleChange = (event) => {
    setArg(event.target.value);
  };

  return (
    <span className="list__item">
      <Button
        label={label}
        onClick={() => {
          dispatch(executeCommand(name, arg));
        }}
      />
      {showArgs && <input type="text" aria-label={`args for ${label}`} onChange={handleChange} />}
    </span>
  );
};

export const ClipboardDisplayContent = ({ type, label, value }) => {
  if (type === TYPE.TEXT) {
    return <span className="list__item">{value}</span>;
  } else if (type === TYPE.LINK) {
    return (
      <a className="link list__item" href={value} target="_blank">
        {label}
      </a>
    );
  } else if (type === TYPE.COPY) {
    return (
      <Button
        isPrimary
        label={label}
        onClick={() => {
          copyToClipboard(value);
        }}
      />
    );
  } else if (type === TYPE.COMMAND) {
    return <ClipboardDisplayCommand label={label} name={value.name} showArgs={value.showArgs} />;
  } else if (type === TYPE.TIMER) {
    return <ClipboardDisplayTimer label={label} value={value} />;
  }

  return null;
};
