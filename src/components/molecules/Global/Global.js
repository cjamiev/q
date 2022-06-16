import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'components/atoms/Modal';
import { loadSettings, updateSettings } from 'components/pages/Settings/settingsActions';
import { createAlert } from 'components/layout/Alert/alertActions';
import { closeGlobalModal, hideLoadingModal, loadCommand, clearCommand, initializeTimer } from './globalActions';
import { TIME } from 'constants/time';
import { SCGlobalModal, SCGlobalModalLoading, SCGlobalModalLoadingName } from './styles';

const ZERO = 0;
const ONE = 1;

const Global = () => {
  const dispatch = useDispatch();
  const { timers, initialized, loadingQueue, modalQueue } = useSelector((state) => state.global);
  const props = modalQueue[ZERO] || {};

  useEffect(() => {
    if (!initialized) {
      dispatch(initializeTimer());
      dispatch(loadCommand());
      dispatch(loadSettings());
    }
  }, [dispatch, initialized]);

  useEffect(() => {
    if (timers.length > ZERO) {
      const sortedTimers = timers
        .map((item) => {
          return {
            name: item.name,
            date: new Date(
              item.value.year,
              item.value.month - ONE,
              item.value.day,
              item.value.hour,
              item.value.minute,
              item.value.second
            )
          };
        })
        .sort((item1, item2) => item1.date.getTime() - item2.date.getTime());

      const now = new Date();
      const finishedTimers = sortedTimers.filter((item) => item.date.getTime() - now.getTime() <= ZERO);
      const nonFinishedTimers = sortedTimers.filter((item) => item.date.getTime() - now.getTime() > ZERO);
      const shortestTimer = nonFinishedTimers[ZERO];

      if (!shortestTimer) {
        return;
      }

      const timeInMilliseconds = shortestTimer.date.getTime() - now.getTime();
      const absoluteTime = timeInMilliseconds > ZERO ? timeInMilliseconds : ZERO;
      const isTimeTooLarge = timeInMilliseconds > TIME.A_DAY;

      finishedTimers.forEach((item) =>
        dispatch(createAlert({ content: `Time's up for "${item.name}"`, status: 'info' }))
      );

      !isTimeTooLarge &&
        setTimeout(() => {
          dispatch(createAlert({ content: `Time's up for "${shortestTimer.name}"`, status: 'info' }));
        }, absoluteTime);
    }
  }, [timers, dispatch]);

  const close = () => {
    dispatch(closeGlobalModal(props.id));
  };

  if (loadingQueue.length) {
    const message = (
      <div>
        <SCGlobalModalLoading>Loading...</SCGlobalModalLoading>
        <SCGlobalModalLoadingName>{loadingQueue[ZERO]}</SCGlobalModalLoadingName>
      </div>
    );
    window.scrollTo({ top: ZERO, behavior: 'smooth' });

    return (
      <SCGlobalModal>
        <Modal
          message={message}
          close={() => {
            dispatch(hideLoadingModal(loadingQueue[ZERO]));
          }}
        />
      </SCGlobalModal>
    );
  } else if (props.message) {
    window.scrollTo({ top: ZERO, behavior: 'smooth' });

    return (
      <SCGlobalModal>
        <Modal close={close} {...props} />
      </SCGlobalModal>
    );
  }

  return null;
};

export default Global;
