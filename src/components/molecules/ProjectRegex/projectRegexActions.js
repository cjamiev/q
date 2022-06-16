import api from 'api';
import { createAlert } from 'components/layout/Alert/alertActions';

const UPDATE_FILES_BY_REGEX = 'UPDATE_FILES_BY_REGEX';

const updateFilesByProjectRegex = (rootDir, content) => {
  return (dispatch) => {
    api
      .post(`/project/?type=regex&root=${rootDir}`, JSON.stringify(content))
      .then((response) => {
        dispatch({ type: UPDATE_FILES_BY_REGEX, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: `updateFilesByProjectRegex: ${error.message}`, status: 'error' }));
      });
  };
};

export { UPDATE_FILES_BY_REGEX, updateFilesByProjectRegex };
