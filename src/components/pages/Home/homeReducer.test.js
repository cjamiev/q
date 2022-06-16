import { LOAD_HOME } from './homeActions';
import homeReducer, { homeInitialState } from './homeReducer';

const ONE = 1;
const TWO = 2;
const THREE = 3;
const FOUR = 4;
const FIVE = 5;
const SIX = 6;

describe('homeReducer', () => {
  it('default', () => {
    const result = homeReducer(undefined, {});

    expect(result).toEqual(homeInitialState);
  });

  it('LOAD_HOME', () => {
    const action = {
      type: LOAD_HOME,
      data: {
        timers: [ONE, TWO, THREE],
        todos: [FOUR, FIVE, SIX]
      }
    };
    const result = homeReducer(homeInitialState, action);

    expect(result).toEqual({
      ...homeInitialState,
      timers: action.data.timers,
      todos: action.data.todos
    });
  });
});
