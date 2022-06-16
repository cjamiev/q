import { waitFor } from '@testing-library/react';
import api from 'api';
import { LOAD_SETTINGS, loadSettings, updateSettings } from './settingsActions';
import { CREATE_ALERT } from 'components/layout/Alert/alertActions';

const error = new Error('Test Message');
const dispatch = jest.fn();

const mockGet = jest.fn();
jest.mock('api');
const errorObject = {
  content: 'Test Message',
  status: 'error'
};
const successObject = {
  content: 'Updated',
  status: 'success',
  timer: 3000
};

const content = [{ name: 'test' }];

describe('settingsActions', () => {
  it('loadSettings', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: JSON.stringify(content)
      }
    });
    loadSettings()(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/db/?name=settings.json');
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_SETTINGS, data: content });
    });
  });

  it('loadSettings - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadSettings()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('updateSettings', async () => {
    api.post.mockResolvedValue({
      data: {
        message: 'testing 123'
      }
    });
    updateSettings(content)(dispatch);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/db', { content: JSON.stringify(content), filename: 'settings.json' });
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_SETTINGS, data: content });
    });
  });

  it('updateSettings - error', async () => {
    api.post.mockRejectedValueOnce(new Error('Test Message'));
    updateSettings(content)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });
});
