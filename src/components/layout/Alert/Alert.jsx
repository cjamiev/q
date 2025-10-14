import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissAlert } from './alertActions';
import './alert.css';

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
    <div className='alert-list-wrapper'>
      {queue.map((item) => {
        return (
          <div className='alert-wrapper' key={item.id}>
            <div className={'alert-header ' + item.status === 'success' ? '' : 'alert-header__error'}>
              {item.status}
              <button
                className='alert-header-btn'
                onClick={() => {
                  dispatch(dismissAlert(item.id));
                }}
              >
                X
              </button>
            </div>
            <div className={'alert-content-wrapper' + item.status === 'success' ? '' : 'alert-content-wrapper__error'}>
              <span className='alert-content'>{item.content}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Alert;
