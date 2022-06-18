import { LOAD_DIRECTORY, LOAD_STORAGE } from './storageActions';
import storageReducer, { storageInitialState } from './storageReducer';

const ONE = 1;
const TWO = 2;
const THREE = 3;

describe('storageReducer', () => {
  it('default', () => {
    const result = storageReducer(undefined, {});

    expect(result).toEqual(storageInitialState);
  });

  it('LOAD_DIRECTORY', () => {
    const action = {
      type: LOAD_DIRECTORY,
      data: [ONE, TWO, THREE]
    };
    const result = storageReducer(storageInitialState, action);

    expect(result).toEqual({
      ...storageInitialState,
      directory: action.data
    });
  });

  it('LOAD_STORAGE', () => {
    const action = {
      type: LOAD_STORAGE,
      data: 'test-storage'
    };
    const result = storageReducer(storageInitialState, action);

    expect(result).toEqual({
      ...storageInitialState,
      storageContent: action.data
    });
  });
});
