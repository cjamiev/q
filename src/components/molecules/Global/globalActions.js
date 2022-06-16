import api from 'api';
import { createAlert } from 'components/layout/Alert/alertActions';

const UPDATE_GLOBAL_TIMER = 'UPDATE_GLOBAL_TIMER';
const INITIALIZE_TIMER = 'INITIALIZE_TIMER';

const OPEN_GLOBAL_MODAL = 'OPEN_GLOBAL_MODAL';
const CLOSE_GLOBAL_MODAL = 'CLOSE_GLOBAL_MODAL';
const SHOW_LOADING_MODAL = 'SHOW_LOADING_MODAL';
const HIDE_LOADING_MODAL = 'HIDE_LOADING_MODAL';

const OPEN_SIDE_PANEL = 'OPEN_SIDE_PANEL';
const CLOSE_SIDE_PANEL = 'CLOSE_SIDE_PANEL';

const LOAD_COMMAND_RESULT = 'LOAD_COMMAND_RESULT';
const EXECUTE_COMMAND_RESULT = 'EXECUTE_COMMAND_RESULT';
const ERROR_COMMAND_RESULT = 'ERROR_COMMAND_RESULT';
const CLEAR_COMMAND_RESULT = 'CLEAR_COMMAND_RESULT';

const updateGlobal = (data) => ({ type: UPDATE_GLOBAL_TIMER, data });
const initializeTimer = () => ({ type: INITIALIZE_TIMER });

const openGlobalModal = (data) => ({ type: OPEN_GLOBAL_MODAL, data });
const closeGlobalModal = (id) => ({ type: CLOSE_GLOBAL_MODAL, id });
const showLoadingModal = (data) => ({ type: SHOW_LOADING_MODAL, data });
const hideLoadingModal = (data) => ({ type: HIDE_LOADING_MODAL, data });

const openSidePanel = () => ({ type: OPEN_SIDE_PANEL });
const closeSidePanel = () => ({ type: CLOSE_SIDE_PANEL });

const loadCommand = () => {
  return (dispatch) => {
    api
      .get('/command')
      .then((response) => {
        dispatch({ type: LOAD_COMMAND_RESULT, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const executeCommand = (filename, args) => {
  return (dispatch) => {
    api
      .get(`/command?name=${filename}&args=${args}`)
      .then((response) => {
        dispatch({ type: EXECUTE_COMMAND_RESULT, data: response.data.message });
      })
      .catch((error) => {
        dispatch({ type: ERROR_COMMAND_RESULT, error: error.message });
      });
  };
};

const clearCommand = () => ({ type: CLEAR_COMMAND_RESULT });

export {
  UPDATE_GLOBAL_TIMER,
  updateGlobal,
  INITIALIZE_TIMER,
  initializeTimer,
  OPEN_GLOBAL_MODAL,
  CLOSE_GLOBAL_MODAL,
  SHOW_LOADING_MODAL,
  HIDE_LOADING_MODAL,
  openGlobalModal,
  closeGlobalModal,
  showLoadingModal,
  hideLoadingModal,
  OPEN_SIDE_PANEL,
  CLOSE_SIDE_PANEL,
  openSidePanel,
  closeSidePanel,
  loadCommand,
  LOAD_COMMAND_RESULT,
  executeCommand,
  EXECUTE_COMMAND_RESULT,
  ERROR_COMMAND_RESULT,
  clearCommand,
  CLEAR_COMMAND_RESULT
};
