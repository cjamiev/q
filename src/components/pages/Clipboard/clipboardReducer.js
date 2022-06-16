import { LOAD_CLIPBOARD } from './clipboardActions';

export const clipboardInitialState = {
  records: {}
};

const clipboardReducer = (state = clipboardInitialState, action) => {
  const clipboardCases = {
    [LOAD_CLIPBOARD]: () => {
      return {
        ...state,
        records: action.data
      };
    }
  };

  return clipboardCases.hasOwnProperty(action.type) ? clipboardCases[action.type]() : state;
};

export default clipboardReducer;
