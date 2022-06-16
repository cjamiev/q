import api from 'api';
import { createAlert } from 'components/layout/Alert/alertActions';

const LOAD_SETTINGS = 'LOAD_SETTINGS';
const THREE_SECOND = 3000;

const loadSettings = () => {
  return (dispatch) => {
    api
      .get('/db/?name=settings.json')
      .then((response) => {
        dispatch({ type: LOAD_SETTINGS, data: JSON.parse(response.data.data) });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const updateSettings = (content) => {
  return (dispatch) => {
    api
      .post('/db', { filename: 'settings.json', content: JSON.stringify(content) })
      .then((response) => {
        dispatch(createAlert({ content: 'Updated', timer: THREE_SECOND, status: 'success' }));
        dispatch({ type: LOAD_SETTINGS, data: content });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

export { LOAD_SETTINGS, loadSettings, updateSettings };
