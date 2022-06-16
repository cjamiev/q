import { waitFor } from '@testing-library/react';
import api from 'api';
import { LOAD_PROJECT, loadProject, updateProject, CLEAR_MESSAGE, clearMessage } from './projectActions';
import { CREATE_ALERT } from 'components/layout/Alert/alertActions';

const error = new Error('Test Message');
const dispatch = jest.fn();

const mockGet = jest.fn();
jest.mock('api');
const getErrorObject = (name) => {
  return {
    content: `${name} Test Message`,
    status: 'error'
  };
};
const successObject = {
  content: 'Updated',
  status: 'success',
  timer: 3000
};

const data = 'test data';
const message = 'test message';
const rootDir = 'test-dir';
const name = 'test-name';
const projectDb = {
  directories: ['./', 'C:/doc'],
  regexes: [
    {
      description: 'reduce svg icon numbers to three decimals',
      fileRegex: 'Icon.js$',
      lineRegex: '[.][0-9]{2,}',
      modifiers: 'g',
      lineRange: {
        start: 0,
        end: 3
      },
      replace: ''
    }
  ]
};

describe('projectActions', () => {
  it('loadProject', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: JSON.stringify(projectDb)
      }
    });
    loadProject()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_PROJECT, data: projectDb });
    });
  });

  it('loadProject - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadProject()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('loadProject:') });
    });
  });

  it('updateProject', async () => {
    api.post.mockResolvedValue({
      data: {
        message: 'testing 123'
      }
    });
    updateProject(projectDb)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_PROJECT, data: projectDb });
    });
  });

  it('updateProject - error', async () => {
    api.post.mockRejectedValueOnce(new Error('Test Message'));
    updateProject(projectDb)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('updateProject:') });
    });
  });

  it('clearMessage', () => {
    expect(clearMessage()).toEqual({ type: CLEAR_MESSAGE });
  });
});
