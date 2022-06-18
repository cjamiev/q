import { LOAD_DIRECTORY, LOAD_STORAGE } from './storageActions';

export const storageInitialState = {
  directory: [],
  storageContent: ''
};

const storageReducer = (state = storageInitialState, action) => {
  const storageCases = {
    [LOAD_DIRECTORY]: () => {
      return {
        ...state,
        directory: action.data
      };
    },
    [LOAD_STORAGE]: () => {
      return {
        ...state,
        storageContent: action.data
      };
    }
  };

  return storageCases.hasOwnProperty(action.type) ? storageCases[action.type]() : state;
};

export default storageReducer;
