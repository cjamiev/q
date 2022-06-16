import {
  UPDATE_GLOBAL_TIMER,
  INITIALIZE_TIMER,
  OPEN_GLOBAL_MODAL,
  CLOSE_GLOBAL_MODAL,
  SHOW_LOADING_MODAL,
  HIDE_LOADING_MODAL,
  OPEN_SIDE_PANEL,
  CLOSE_SIDE_PANEL,
  LOAD_COMMAND_RESULT,
  EXECUTE_COMMAND_RESULT,
  ERROR_COMMAND_RESULT,
  CLEAR_COMMAND_RESULT
} from './globalActions';
import { isNumber } from 'utils/type-check';

export const globalInitialState = {
  timers: [],
  initialized: false,
  modalQueue: [],
  loadingQueue: [],
  isSidePanelOpen: false,
  commandResponse: '',
  commands: []
};

const globalReducer = (state = globalInitialState, action) => {
  const globalCases = {
    [UPDATE_GLOBAL_TIMER]: () => {
      localStorage.setItem('globaltimers', JSON.stringify(action.data));

      return {
        ...state,
        timers: action.data
      };
    },
    [INITIALIZE_TIMER]: () => {
      const globaltimers = localStorage.getItem('globaltimers') || '[]';

      return {
        ...state,
        initialized: true,
        timers: JSON.parse(globaltimers)
      };
    },
    [OPEN_GLOBAL_MODAL]: () => {
      return {
        ...state,
        modalQueue: [
          ...state.modalQueue,
          {
            id: state.modalQueue.length,
            ...action.data
          }
        ]
      };
    },
    [CLOSE_GLOBAL_MODAL]: () => {
      const filteredModalQueue = isNumber(action.id) ? state.modalQueue.filter((item) => action.id !== item.id) : [];

      return {
        ...state,
        modalQueue: filteredModalQueue
      };
    },
    [SHOW_LOADING_MODAL]: () => {
      return {
        ...state,
        loadingQueue: [...state.loadingQueue, action.data]
      };
    },
    [HIDE_LOADING_MODAL]: () => {
      const filteredLoadingQueue = action.data ? state.loadingQueue.filter((item) => action.data !== item) : [];

      return {
        ...state,
        loadingQueue: filteredLoadingQueue
      };
    },
    [OPEN_SIDE_PANEL]: () => {
      return { ...state, isSidePanelOpen: true };
    },
    [CLOSE_SIDE_PANEL]: () => {
      return { ...state, isSidePanelOpen: false };
    },
    [LOAD_COMMAND_RESULT]: () => {
      return {
        ...state,
        commands: action.data
      };
    },
    [EXECUTE_COMMAND_RESULT]: () => {
      return {
        ...state,
        commandResponse: action.data
      };
    },
    [ERROR_COMMAND_RESULT]: () => {
      return {
        ...state,
        commandResponse: action.error
      };
    },
    [CLEAR_COMMAND_RESULT]: () => {
      return {
        ...state,
        commandResponse: ''
      };
    }
  };

  return globalCases.hasOwnProperty(action.type) ? globalCases[action.type]() : state;
};

export default globalReducer;
