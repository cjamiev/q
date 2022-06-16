import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_REMOTE_URL,
  getRemoteUrl,
  DELETE_BRANCH,
  deleteBranch,
  CREATE_BRANCH,
  createBranch,
  MERGE_BRANCH,
  mergeBranch,
  SELECT_BRANCH,
  selectBranch,
  LOAD_BRANCHES,
  viewBranches,
  CREATE_STASH,
  createStash,
  DELETE_STASH,
  deleteStash,
  SELECT_STASH,
  selectStash,
  LOAD_VIEW_STASH,
  viewStash,
  RESET_BRANCH,
  resetBranch
} from './projectGitActions';
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

describe('projectGitActions', () => {
  it('getRemoteUrl', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: remoteurl
      }
    });
    getRemoteUrl(rootDir)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=remoteurl&root=${rootDir}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_REMOTE_URL, data: remoteurl });
    });
  });

  it('getRemoteUrl - error', async () => {
    api.get.mockRejectedValueOnce(error);
    getRemoteUrl()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('getRemoteUrl:') });
    });
  });

  it('deleteBranch', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    deleteBranch(rootDir, name)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=deletebranch&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: DELETE_BRANCH, message });
    });
  });

  it('deleteBranch - error', async () => {
    api.get.mockRejectedValueOnce(error);
    deleteBranch()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('deleteBranch:') });
    });
  });

  it('createBranch', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    createBranch(rootDir, name)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=createbranch&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_BRANCH, message });
    });
  });

  it('createBranch - error', async () => {
    api.get.mockRejectedValueOnce(error);
    createBranch()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('createBranch:') });
    });
  });

  it('mergeBranch', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    mergeBranch(rootDir, name)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=mergebranch&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: MERGE_BRANCH, message });
    });
  });

  it('mergeBranch - error', async () => {
    api.get.mockRejectedValueOnce(error);
    mergeBranch()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('mergeBranch:') });
    });
  });

  it('selectBranch', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    selectBranch(rootDir, name)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=selectbranch&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: SELECT_BRANCH, message });
    });
  });

  it('selectBranch - error', async () => {
    api.get.mockRejectedValueOnce(error);
    selectBranch()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('selectBranch:') });
    });
  });

  it('viewBranches', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data
      }
    });
    viewBranches(rootDir)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=viewbranches&root=${rootDir}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_BRANCHES, data });
    });
  });

  it('viewBranches - error', async () => {
    api.get.mockRejectedValueOnce(error);
    viewBranches()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('viewBranches:') });
    });
  });

  it('createStash', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    createStash(rootDir, name)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=createstash&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_STASH, message });
    });
  });

  it('createStash - error', async () => {
    api.get.mockRejectedValueOnce(error);
    createStash()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('createStash:') });
    });
  });

  it('deleteStash', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    deleteStash(rootDir, name)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=deletestash&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: DELETE_STASH, message });
    });
  });

  it('deleteStash - error', async () => {
    api.get.mockRejectedValueOnce(error);
    deleteStash()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('deleteStash:') });
    });
  });

  it('selectStash', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    selectStash(rootDir, name)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=selectstash&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: SELECT_STASH, message });
    });
  });

  it('selectStash - error', async () => {
    api.get.mockRejectedValueOnce(error);
    selectStash()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('selectStash:') });
    });
  });

  it('viewStash', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data
      }
    });
    viewStash(rootDir)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=viewstash&root=${rootDir}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_VIEW_STASH, data });
    });
  });

  it('viewStash - error', async () => {
    api.get.mockRejectedValueOnce(error);
    viewStash()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('viewStash:') });
    });
  });

  it('resetBranch', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    resetBranch(rootDir)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=resetbranch&root=${rootDir}`);
      expect(dispatch).toHaveBeenCalledWith({ type: RESET_BRANCH, message });
    });
  });

  it('resetBranch - error', async () => {
    api.get.mockRejectedValueOnce(error);
    resetBranch()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('resetBranch:') });
    });
  });
});
