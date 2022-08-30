import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissAlert } from './alertActions';
import { SCAlertWrapper, SCAlert, SCAlertHeader, SCAlertContent } from './styles';

const ZERO = 0;

const Alert = () => {
  const dispatch = useDispatch();
  const { queue } = useSelector((state) => state.alert);
  const timerQueue = queue.filter((item) => item.timer);

  useEffect(() => {
    if (timerQueue.length > ZERO) {
      timerQueue.forEach((item) => {
        setTimeout(() => {
          dispatch(dismissAlert(item.id));
        }, item.timer);
      });
    }
  }, [timerQueue, dispatch]);

  if (!queue.length) {
    return null;
  }

  return (
    <SCAlertWrapper>
      {queue.map((item) => {
        return (
          <SCAlert key={item.id}>
            <SCAlertHeader status={item.status}>
              {item.status}
              <button
                onClick={() => {
                  dispatch(dismissAlert(item.id));
                }}
              >
                X
              </button>
            </SCAlertHeader>
            <SCAlertContent status={item.status}>
              <span>{item.content}</span>
            </SCAlertContent>
          </SCAlert>
        );
      })}
    </SCAlertWrapper>
  );
};

export default Alert;
