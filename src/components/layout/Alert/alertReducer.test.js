import { CREATE_ALERT, DISMISS_ALERT } from './alertActions';
import alertReducer from './alertReducer';

const ONE = 1;
const initialState = {
  queue: [
    {
      id: 0,
      content: 'test-content',
      status: 'error'
    },
    {
      id: 1,
      content: 'test-content2',
      status: 'info'
    }
  ]
};

describe('alertReducer', () => {
  it('default', () => {
    const result = alertReducer(undefined, {});

    expect(result).toEqual({
      queue: []
    });
  });

  it('CREATE_ALERT', () => {
    const action = {
      type: CREATE_ALERT,
      data: {
        content: 'test-content3',
        status: 'warning'
      }
    };
    const result = alertReducer(initialState, action);

    expect(result).toEqual({
      queue: [...initialState.queue, { id: 2, ...action.data }]
    });
  });

  it('CREATE_ALERT with duplicate', () => {
    const action = {
      type: CREATE_ALERT,
      data: {
        content: 'test-content2',
        status: 'info'
      }
    };
    const result = alertReducer(initialState, action);

    expect(result).toEqual({
      queue: initialState.queue
    });
  });

  it('DISMISS_ALERT', () => {
    const action = {
      type: DISMISS_ALERT,
      id: 0
    };
    const result = alertReducer(initialState, action);

    expect(result).toEqual({
      queue: [initialState.queue[ONE]]
    });
  });

  it('DISMISS_ALERT - no id', () => {
    const action = {
      type: DISMISS_ALERT
    };
    const result = alertReducer(initialState, action);

    expect(result).toEqual({
      queue: []
    });
  });
});
