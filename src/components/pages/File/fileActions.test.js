import { waitFor } from '@testing-library/react';
import api from 'api';
import { LOAD_DIRECTORY, loadDirectory, LOAD_FILE, loadFile, WRITE_FILE, writeFile } from './fileActions';
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

describe('fileActions', () => {
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

  it('loadFile', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: 'test file'
      }
    });
    loadFile()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_FILE, data: 'test file' });
    });
  });

  it('loadFile - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadFile()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('writeFile', async () => {
    api.post.mockResolvedValue({
      data: {
        message: 'testing 123'
      }
    });
    writeFile()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
    });
  });

  it('writeFile - error', async () => {
    api.post.mockRejectedValueOnce(new Error('Test Message'));
    writeFile()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });
});
