import { CREATE_ALERT, DISMISS_ALERT } from './alertActions';
import { isNumber } from '../../../utils/type-check';

export const alertInitialState = {
  queue: []
};

const alertReducer = (state = alertInitialState, action) => {
  const alertCases = {
    [CREATE_ALERT]: () => {
      const matched = state.queue.find((item) => item.content === action.data.content);
      if (!matched) {
        return {
          queue: [
            ...state.queue,
            {
              id: state.queue.length,
              ...action.data
            }
          ]
        };
      } else {
        return state;
      }
    },
    [DISMISS_ALERT]: () => {
      const filteredQueue = isNumber(action.id) ? state.queue.filter((item) => action.id !== item.id) : [];

      return {
        ...state,
        queue: filteredQueue
      };
    }
  };

  return alertCases.hasOwnProperty(action.type) ? alertCases[action.type]() : state;
};

export default alertReducer;
