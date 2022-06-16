import api from 'api';
import { createAlert } from 'components/layout/Alert/alertActions';

const LOAD_CLIPBOARD = 'LOAD_CLIPBOARD';

const THREE_SECOND = 3000;
const ZERO = 0;

const loadClipboard = () => {
  return (dispatch) => {
    api
      .get('/db/?name=clipboard.json')
      .then((response) => {
        dispatch({ type: LOAD_CLIPBOARD, data: JSON.parse(response.data.data) });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const updateClipboard = (content) => {
  return (dispatch) => {
    api
      .post('/db', { filename: 'clipboard.json', content: JSON.stringify(content) })
      .then((response) => {
        dispatch(createAlert({ content: 'Updated', timer: THREE_SECOND, status: 'success' }));
        dispatch({ type: LOAD_CLIPBOARD, data: content });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

export { LOAD_CLIPBOARD, loadClipboard, updateClipboard };
