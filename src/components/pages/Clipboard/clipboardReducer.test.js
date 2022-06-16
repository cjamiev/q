import { LOAD_CLIPBOARD } from './clipboardActions';
import clipboardReducer, { clipboardInitialState } from './clipboardReducer';

const ONE = 1;
const TWO = 2;
const THREE = 3;
const FOUR = 4;
const FIVE = 5;
const SIX = 6;

describe('clipboardReducer', () => {
  it('default', () => {
    const result = clipboardReducer(undefined, {});

    expect(result).toEqual(clipboardInitialState);
  });

  it('LOAD_CLIPBOARD', () => {
    const action = {
      type: LOAD_CLIPBOARD,
      data: {
        one: [ONE, TWO, THREE],
        two: [FOUR, FIVE, SIX]
      }
    };
    const result = clipboardReducer(clipboardInitialState, action);

    expect(result).toEqual({
      ...clipboardInitialState,
      records: action.data
    });
  });
});
