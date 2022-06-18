import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_DIRECTORY,
  loadDirectory,
  LOAD_STORAGE,
  loadStorage,
  WRITE_STORAGE,
  writeStorage
} from './storageActions';
import { CREATE_ALERT } from 'components/layout/Alert/alertActions';

const ONE = 1;
const TWO = 2;
const THREE = 3;
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

describe('storageActions', () => {
  it('loadDirectory', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: [ONE, TWO, THREE]
      }
    });
    loadDirectory()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_DIRECTORY, data: [ONE, TWO, THREE] });
    });
  });

  it('loadDirectory - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadDirectory()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('loadStorage', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: 'test storage'
      }
    });
    loadStorage()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_STORAGE, data: 'test storage' });
    });
  });

  it('loadStorage - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadStorage()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('writeStorage', async () => {
    api.post.mockResolvedValue({
      data: {
        message: 'testing 123'
      }
    });
    writeStorage()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
    });
  });

  it('writeStorage - error', async () => {
    api.post.mockRejectedValueOnce(new Error('Test Message'));
    writeStorage()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });
});
