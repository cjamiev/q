import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_SNIPPET_DIRECTORY,
  loadSnippetDirectory,
  LOAD_SNIPPET,
  loadSnippet,
  createSnippet
} from 'components/molecules/ProjectSnippet/projectSnippetActions';
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

const THREE_SECOND = 3000;
const snippets = ['snippetOne', 'snippetTwo'];
const fileContent = 'test contents';
const fileName = 'test name';
const message = 'test message';

describe('snippetActions', () => {
  it('loadSnippetDirectory', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: snippets
      }
    });
    loadSnippetDirectory()(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/project/?type=snippet&op=read');
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_SNIPPET_DIRECTORY, data: snippets });
    });
  });

  it('loadSnippetDirectory - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadSnippetDirectory()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('loadSnippetDirectory:') });
    });
  });

  it('loadSnippet', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: fileContent
      }
    });
    loadSnippet(fileName)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=snippet&op=read&name=${fileName}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_SNIPPET, data: { content: fileContent, name: fileName } });
    });
  });

  it('loadSnippet - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadSnippet()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('loadSnippet:') });
    });
  });

  it('createSnippet', async () => {
    api.post.mockResolvedValueOnce({
      data: {
        message
      }
    });
    api.get.mockResolvedValueOnce({
      data: {
        data: snippets
      }
    });
    createSnippet(name, fileContent)(dispatch);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        `/project/?type=snippet&op=write&name=${name}`,
        JSON.stringify(fileContent)
      );
      expect(dispatch).toHaveBeenCalledWith({
        type: CREATE_ALERT,
        data: { content: `Created ${name}`, timer: THREE_SECOND, status: 'success' }
      });
    });
  });

  it('createSnippet - error', async () => {
    api.post.mockRejectedValueOnce(error);
    createSnippet(name, fileContent)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: getErrorObject('createSnippet:') });
    });
  });
});
