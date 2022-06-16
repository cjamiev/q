import { waitFor } from '@testing-library/react';
import api from 'api';
import { LOAD_CLIPBOARD, ERROR_CLIPBOARD, loadClipboard, updateClipboard } from './clipboardActions';
import { CREATE_ALERT } from 'components/layout/Alert/alertActions';

const ONE = 1;
const TWO = 2;
const THREE = 3;
const FOUR = 4;
const error = new Error('Test Message');
const dispatch = jest.fn();

const mockGet = jest.fn();
jest.mock('api');
api.get.mockResolvedValue({
  data: {
    data: '{ "one": [1,2,3], "two": [2,3,4] }'
  }
});
api.post.mockResolvedValue({
  data: {
    message: 'testing 123'
  }
});
const errorObject = {
  content: 'Test Message',
  status: 'error'
};
const successObject = {
  content: 'Updated',
  status: 'success',
  timer: 3000
};

describe('clipboardActions', () => {
  it('loadClipboard', async () => {
    loadClipboard()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: LOAD_CLIPBOARD,
        data: { one: [ONE, TWO, THREE], two: [TWO, THREE, FOUR] }
      });
    });
  });

  it('loadClipboard - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadClipboard()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('updateClipboard', async () => {
    updateClipboard({ test: 123 })(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_CLIPBOARD, data: { test: 123 } });
    });
  });

  it('updateClipboard - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updateClipboard()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });
});
