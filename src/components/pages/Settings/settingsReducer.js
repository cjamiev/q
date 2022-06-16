import { LOAD_SETTINGS } from './settingsActions';

export const settingsInitialState = {
  commands: [],
  links: [],
  copy: []
};

const settingsReducer = (state = settingsInitialState, action) => {
  const settingsCases = {
    [LOAD_SETTINGS]: () => {
      return {
        ...state,
        commands: action.data.commands,
        links: action.data.links,
        copy: action.data.copy
      };
    }
  };

  return settingsCases.hasOwnProperty(action.type) ? settingsCases[action.type]() : state;
};

export default settingsReducer;
