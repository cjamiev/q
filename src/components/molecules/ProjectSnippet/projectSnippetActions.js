import api from 'api';
import { createAlert } from 'components/layout/Alert/alertActions';

const LOAD_SNIPPET = 'LOAD_SNIPPET';
const LOAD_SNIPPET_DIRECTORY = 'LOAD_SNIPPET_DIRECTORY';
const THREE_SECOND = 3000;

const loadSnippetDirectory = () => {
  return (dispatch) => {
    api
      .get('/project/?type=snippet&op=read')
      .then((response) => {
        dispatch({ type: LOAD_SNIPPET_DIRECTORY, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: `loadSnippetDirectory: ${error.message}`, status: 'error' }));
      });
  };
};

const loadSnippet = (name) => {
  return (dispatch) => {
    api
      .get(`/project/?type=snippet&op=read&name=${name}`)
      .then((response) => {
        dispatch({ type: LOAD_SNIPPET, data: { name, content: response.data.data } });
      })
      .catch((error) => {
        dispatch(createAlert({ content: `loadSnippet: ${error.message}`, status: 'error' }));
      });
  };
};

const createSnippet = (name, content) => {
  return (dispatch) => {
    api
      .post(`/project/?type=snippet&op=write&name=${name}`, JSON.stringify(content))
      .then((response) => {
        dispatch(createAlert({ content: `Created ${name}`, timer: THREE_SECOND, status: 'success' }));
        dispatch(loadSnippetDirectory());
        dispatch({ type: LOAD_SNIPPET, data: { name, content } });
      })
      .catch((error) => {
        dispatch(createAlert({ content: `createSnippet: ${error.message}`, status: 'error' }));
      });
  };
};

const deleteSnippet = (filename) => {
  return (dispatch) => {
    api
      .get(`/project/?type=snippet&op=delete&name=${filename}`)
      .then((response) => {
        dispatch(createAlert({ content: `Deleted ${filename}`, timer: THREE_SECOND, status: 'success' }));
        dispatch(loadSnippetDirectory());
      })
      .catch((error) => {
        dispatch(createAlert({ content: `deleteSnippet: ${error.message}`, status: 'error' }));
      });
  };
};

export { LOAD_SNIPPET_DIRECTORY, loadSnippetDirectory, LOAD_SNIPPET, loadSnippet, createSnippet, deleteSnippet };
