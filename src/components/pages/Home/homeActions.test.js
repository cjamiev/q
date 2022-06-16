import { waitFor } from '@testing-library/react';
import api from 'api';
import { LOAD_HOME, loadHome, updateHome } from './homeActions';
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

const content = [
  { name: 'test', value: { parentBackgroundColor: {}, hoverStyle: {}, normalStyle: {}, activeStyle: {} } }
];

describe('homeActions', () => {
  it('loadHome', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: JSON.stringify(content)
      }
    });
    loadHome()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_HOME, data: content });
    });
  });

  it('loadHome - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadHome()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('updateHome', async () => {
    api.post.mockResolvedValue({
      data: {
        message: 'testing 123'
      }
    });
    updateHome(content)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_HOME, data: content });
    });
  });

  it('updateHome - error', async () => {
    api.post.mockRejectedValueOnce(new Error('Test Message'));
    updateHome(content)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });
});
