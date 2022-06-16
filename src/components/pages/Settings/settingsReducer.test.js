import { LOAD_SETTINGS } from './settingsActions';
import settingsReducer, { settingsInitialState } from './settingsReducer';

const ONE = 1;
const TWO = 2;
const THREE = 3;

describe('settingsReducer', () => {
  it('default', () => {
    const result = settingsReducer(undefined, {});

    expect(result).toEqual(settingsInitialState);
  });

  it('LOAD_SETTINGS', () => {
    const action = {
      type: LOAD_SETTINGS,
      data: {
        commands: [ONE, TWO, THREE],
        links: [THREE, TWO, ONE],
        copy: [ONE, THREE, TWO]
      }
    };
    const result = settingsReducer(settingsInitialState, action);

    expect(result).toEqual({
      ...settingsInitialState,
      commands: action.data.commands,
      links: action.data.links,
      copy: action.data.copy
    });
  });
});
