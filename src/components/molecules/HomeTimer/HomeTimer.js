import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openGlobalModal } from 'components/molecules/Global/globalActions';
import Card from 'components/atoms/Card';
import useTimer from 'hooks/useTimer';
import { formattedTimerClock } from 'utils/clock';
import { decrementElementIndex, incrementElementIndex, swapArrayElementPositions } from 'utils/arrayHelper';
import { TrashSVG } from 'components/atoms/Icons';
import { PenSVG } from 'components/atoms/Icons/PenSVG';
import TimerForm from 'components/atoms/Form/TimerForm';
import { noop } from 'utils/noop';
import { SCTimerTab, SCTimers, SCHomeCardWrapper } from './styles';

const ZERO = 0;
const ONE = 1;

const getFormattedTime = ({ weeks, days, hours, minutes, seconds }, label) => {
  if (weeks > ZERO) {
    return <p>{weeks} Weeks</p>;
  }

  if (days > ZERO) {
    return <p>{days} Days</p>;
  }

  return <p>{formattedTimerClock(hours, minutes, seconds)}</p>;
};

const TimerCard = ({ item, onRemoveTimer, onEditTimer }) => {
  const dispatch = useDispatch();
  const { year, month, day, hour, minute, second } = item.value;
  const newDate = new Date(year, month - ONE, day, hour, minute, second);
  const time = useTimer(newDate);

  const confirmDeleteTimer = (timerName) => {
    dispatch(
      openGlobalModal({
        title: 'Confirmation Modal',
        message: `Are you sure you want to delete '${timerName}'`,
        buttonList: [
          {
            label: 'Confirm',
            isPrimary: true,
            action: () => {
              onRemoveTimer(timerName);
            }
          },
          {
            label: 'Cancel',
            isSecondary: true,
            action: noop
          }
        ]
      })
    );
  };

  return (
    <SCHomeCardWrapper>
      <Card
        title={item.name}
        body={getFormattedTime(time, item.name)}
        footer={
          <>
            <PenSVG
              transform="translate(0,4)"
              ariaLabel="Edit"
              width="45"
              height="53"
              onClick={() => {
                onEditTimer(item.name, newDate);
              }}
            />
            <TrashSVG
              transform="translate(0,4)"
              width="45"
              onClick={() => {
                confirmDeleteTimer(item.name);
              }}
            />
          </>
        }
      />
    </SCHomeCardWrapper>
  );
};

export const HomeTimer = ({ timers, selectedTimer, onChangeTimer, onRemoveTimer, onEditTimer }) => {
  const renderTimers =
    timers.length > ZERO ? (
      timers.map((item) => (
        <TimerCard key={item.name} item={item} onRemoveTimer={onRemoveTimer} onEditTimer={onEditTimer} />
      ))
    ) : (
      <p> No timers to display </p>
    );

  return (
    <SCTimerTab>
      <div>
        <TimerForm
          onChange={({ name, content }) => {
            const newTimer = { name, value: content, type: 'timer' };

            onChangeTimer(newTimer);
          }}
          value={selectedTimer}
        />
      </div>
      <SCTimers>{renderTimers}</SCTimers>
    </SCTimerTab>
  );
};
