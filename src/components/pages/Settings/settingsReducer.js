import { LOAD_SETTINGS } from './settingsActions';

export const settingsInitialState = {
  commands: [],
  copy: []
};

const settingsReducer = (state = settingsInitialState, action) => {
  const settingsCases = {
    [LOAD_SETTINGS]: () => {
      return {
        ...state,
        commands: action.data.commands,
        copy: action.data.copy
      };
    }
  };

  return settingsCases.hasOwnProperty(action.type) ? settingsCases[action.type]() : state;
};

export default settingsReducer;
