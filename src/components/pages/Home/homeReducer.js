import { LOAD_HOME } from './homeActions';

export const homeInitialState = {
  todos: [],
  timers: []
};

const homeReducer = (state = homeInitialState, action) => {
  const homeCases = {
    [LOAD_HOME]: () => {
      return {
        ...state,
        todos: action.data.todos,
        timers: action.data.timers
      };
    }
  };

  return homeCases.hasOwnProperty(action.type) ? homeCases[action.type]() : state;
};

export default homeReducer;
