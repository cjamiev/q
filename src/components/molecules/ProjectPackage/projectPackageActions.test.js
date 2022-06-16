import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_PACKAGE,
  getPackageJson,
  LOAD_VERSIONS,
  getDependencyVersions,
  RUN_SCRIPT,
  runNpmScript,
  UPDATE_PACKAGE,
  updatePackage,
  UPDATE_FILES_BY_REGEX
} from './projectPackageActions';
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
const packageJson = { one: 1, two: 2, three: 3 };

describe('projectPackageActions', () => {
  it('getPackageJson', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data
      }
    });
    getPackageJson(rootDir)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=package&op=read&root=${rootDir}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_PACKAGE, data });
    });
  });

  it('getPackageJson - error', async () => {
    api.get.mockRejectedValueOnce(error);
    getPackageJson()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('getPackageJson:') });
    });
  });

  it('getDependencyVersions', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data
      }
    });
    getDependencyVersions(rootDir)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=package&op=getversions&root=${rootDir}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_VERSIONS, data });
    });
  });

  it('getDependencyVersions - error', async () => {
    api.get.mockRejectedValueOnce(error);
    getDependencyVersions()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('getDependencyVersions:') });
    });
  });

  it('runNpmScript', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    runNpmScript(rootDir, 'script-name')(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=package&op=runscript&root=${rootDir}&content=script-name`);
      expect(dispatch).toHaveBeenCalledWith({ type: RUN_SCRIPT, message });
    });
  });

  it('runNpmScript - error', async () => {
    api.get.mockRejectedValueOnce(error);
    runNpmScript()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('runNpmScript:') });
    });
  });

  it('updatePackage', async () => {
    api.post.mockResolvedValueOnce({
      data: {
        message
      }
    });
    updatePackage(rootDir, packageJson)(dispatch);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        `/project/?type=package&op=update&root=${rootDir}`,
        JSON.stringify(packageJson)
      );
      expect(dispatch).toHaveBeenCalledWith({ type: UPDATE_PACKAGE, message });
    });
  });

  it('updatePackage - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updatePackage()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('updatePackage:') });
    });
  });
});
