import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { reduxTestWrapper, mockStore, mockApi, mockGet, mockPost } from 'testHelper';
import api from 'api';
import Settings from './Settings';

const ZERO = 0;
const TWO = 2;
const defaultStoreProps = {
  global: mockStore.global,
  settings: mockStore.settings,
  project: mockStore.project
};

const apiMock = mockApi(mockGet, mockPost);

describe('Settings', () => {
  it('handle add command', () => {
    reduxTestWrapper(Settings, {}, defaultStoreProps);

    fireEvent.change(screen.getByLabelText('Description text field'), { target: { value: 'commandLabelThree' } });
    fireEvent.change(screen.getByLabelText('File text field'), { target: { value: 'commandThree' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(api.post).toHaveBeenCalledWith('/db', {
      content: JSON.stringify({
        commands: [{ label: 'commandLabelThree', value: 'commandThree', id: 2 }].concat(mockStore.settings.commands),
        links: mockStore.settings.links,
        copy: mockStore.settings.copy
      }),
      filename: 'settings.json'
    });
  });
});
