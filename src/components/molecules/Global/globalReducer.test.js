import { mockLocalStorage } from 'testHelper';
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
import globalReducer, { globalInitialState } from './globalReducer';


const ONE = 1;
const TWO = 2;
const THREE = 3;
const timerOne = [
  {
    name: 'item one',
    value: {
      month: 9,
      day: 9,
      year: 2021,
      hour: 0,
      minute: 0,
      second: 0
    },
    type: 'timer'
  }
];
mockLocalStorage({
  globaltimers: JSON.stringify(timerOne)
});

const initialState = {
  modalQueue: [
    {
      id: 0,
      title: 'test-title',
      message: 'test-message',
      action: jest.fn()
    },
    {
      id: 1,
      title: 'test-title1',
      message: 'test-message1',
      action: jest.fn()
    }
  ],
  loadingQueue: ['Loading One']
};

describe('globalReducer', () => {
  it('default', () => {
    const result = globalReducer(undefined, {});

    expect(result).toEqual({
      ...globalInitialState,
      modalQueue: [],
      loadingQueue: []
    });
  });

  it('INITIALIZE_TIMER', () => {
    const action = {
      type: INITIALIZE_TIMER
    };
    const result = globalReducer(globalInitialState, action);

    expect(result).toEqual({
      ...globalInitialState,
      initialized: true,
      timers: timerOne
    });
  });

  it('UPDATE_GLOBAL_TIMER', () => {
    const action = {
      type: UPDATE_GLOBAL_TIMER,
      data: timerOne
    };
    const result = globalReducer(globalInitialState, action);

    expect(result).toEqual({
      ...globalInitialState,
      timers: action.data
    });
  });

  it('OPEN_GLOBAL_MODAL', () => {
    const action = {
      type: OPEN_GLOBAL_MODAL,
      data: {
        title: 'test-title2',
        message: 'test-message2',
        action: jest.fn()
      }
    };
    const result = globalReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      modalQueue: [...initialState.modalQueue, { id: 2, ...action.data }]
    });
  });

  it('CLOSE_GLOBAL_MODAL', () => {
    const action = {
      type: CLOSE_GLOBAL_MODAL,
      id: 0
    };
    const result = globalReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      modalQueue: [initialState.modalQueue[ONE]]
    });
  });

  it('CLOSE_GLOBAL_MODAL with no id', () => {
    const action = {
      type: CLOSE_GLOBAL_MODAL,
      data: {}
    };
    const result = globalReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      modalQueue: []
    });
  });

  it('SHOW_LOADING_MODAL', () => {
    const action = {
      type: SHOW_LOADING_MODAL,
      data: 'Loading Two'
    };
    const result = globalReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      loadingQueue: ['Loading One','Loading Two']
    });
  });

  it('HIDE_LOADING_MODAL', () => {
    const action = {
      type: HIDE_LOADING_MODAL,
      data: 'Loading One'
    };
    const result = globalReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      loadingQueue: []
    });
  });

  it('OPEN_SIDE_PANEL', () => {
    const action = {
      type: OPEN_SIDE_PANEL
    };
    const result = globalReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      isSidePanelOpen: true
    });
  });

  it('CLOSE_SIDE_PANEL', () => {
    const action = {
      type: CLOSE_SIDE_PANEL
    };
    const result = globalReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      isSidePanelOpen: false
    });
  });

  it('LOAD_COMMAND_RESULT', () => {
    const action = {
      type: LOAD_COMMAND_RESULT,
      data: [ONE, TWO, THREE]
    };
    const result = globalReducer(globalInitialState, action);

    expect(result).toEqual({
      ...globalInitialState,
      commands: action.data
    });
  });

  it('EXECUTE_COMMAND_RESULT', () => {
    const action = {
      type: EXECUTE_COMMAND_RESULT,
      data: 'test-message'
    };
    const result = globalReducer(globalInitialState, action);

    expect(result).toEqual({
      ...globalInitialState,
      commandResponse: action.data
    });
  });

  it('ERROR_COMMAND_RESULT', () => {
    const action = {
      type: ERROR_COMMAND_RESULT,
      error: {
        message: 'test-error'
      }
    };
    const result = globalReducer(globalInitialState, action);

    expect(result).toEqual({
      ...globalInitialState,
      commandResponse: action.error
    });
  });

  it('CLEAR_COMMAND_RESULT', () => {
    const action = {
      type: CLEAR_COMMAND_RESULT
    };
    const result = globalReducer(globalInitialState, action);

    expect(result).toEqual({
      ...globalInitialState,
      commandResponse: ''
    });
  });
});
