import { waitFor } from '@testing-library/react';
import api from 'api';
import { UPDATE_FILES_BY_REGEX, updateFilesByProjectRegex } from './projectRegexActions';
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

const remoteurl = 'remote url';
const data = 'test data';
const message = 'test message';
const rootDir = 'test-dir';
const name = 'test-name';
const regexContent = {
  fileProjectRegex: /Icon.js$/,
  lineProjectRegex: /[.][0-9]{2,}/g,
  lineRange: {
    start: 0,
    end: 3
  },
  replace: '123'
};

describe('projectActions', () => {
  it('updateFilesByProjectRegex', async () => {
    api.post.mockResolvedValueOnce({
      data: {
        message
      }
    });
    updateFilesByProjectRegex(rootDir, regexContent)(dispatch);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(`/project/?type=regex&root=${rootDir}`, JSON.stringify(regexContent));
      expect(dispatch).toHaveBeenCalledWith({ type: UPDATE_FILES_BY_REGEX, message });
    });
  });

  it('updateFilesByProjectRegex - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updateFilesByProjectRegex()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('updateFilesByProjectRegex:') });
    });
  });
});
