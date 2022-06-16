import api from 'api';
import { createAlert } from 'components/layout/Alert/alertActions';
import { showLoadingModal, hideLoadingModal } from 'components/molecules/Global/globalActions';

const LOAD_PROJECT = 'LOAD_PROJECT';
const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
const THREE_SECOND = 3000;
const DEFAULT_DIR = './';

const loadProject = () => {
  return (dispatch) => {
    dispatch(showLoadingModal('Project'));
    api
      .get('/db/?name=project.json')
      .then((response) => {
        dispatch({ type: LOAD_PROJECT, data: JSON.parse(response.data.data) });
      })
      .catch((error) => {
        dispatch(createAlert({ content: `loadProject: ${error.message}`, status: 'error' }));
      })
      .finally(() => {
        dispatch(hideLoadingModal('Project'));
      });
  };
};

const updateProject = (content) => {
  return (dispatch) => {
    api
      .post('/db', { filename: 'project.json', content: JSON.stringify(content) })
      .then((response) => {
        dispatch(createAlert({ content: 'Updated', timer: THREE_SECOND, status: 'success' }));
        dispatch({ type: LOAD_PROJECT, data: content });
      })
      .catch((error) => {
        dispatch(createAlert({ content: `updateProject: ${error.message}`, status: 'error' }));
      });
  };
};

const clearMessage = () => ({ type: CLEAR_MESSAGE });

export { LOAD_PROJECT, loadProject, updateProject, CLEAR_MESSAGE, clearMessage };
