import { waitFor } from '@testing-library/react';
import api from 'api';
import {
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
} from './globalActions';
import { CREATE_ALERT } from 'components/layout/Alert/alertActions';

const ONE = 1;
const TWO = 2;
const THREE = 3;
const data = { key: 123 };

const error = new Error('Test Message');
const dispatch = jest.fn();
const errorObject = {
  content: 'Test Message',
  status: 'error'
};

jest.mock('api');
api.get.mockResolvedValue({
  data: {
    data: [ONE, TWO, THREE],
    message: 'test message'
  }
});

describe('globalActions', () => {
  it('updateGlobal', () => {
    expect(updateGlobal([ONE, TWO, THREE])).toEqual({ type: UPDATE_GLOBAL_TIMER, data: [ONE, TWO, THREE] });
  });

  it('initializeTimer', () => {
    expect(initializeTimer()).toEqual({ type: INITIALIZE_TIMER });
  });

  it('openGlobalModal', () => {
    const result = openGlobalModal(data);

    expect(result).toEqual({ type: OPEN_GLOBAL_MODAL, data });
  });

  it('closeGlobalModal', () => {
    const result = closeGlobalModal(ONE);

    expect(result).toEqual({ type: CLOSE_GLOBAL_MODAL, id: 1 });
  });

  it('showLoadingModal', () => {
    const result = showLoadingModal('Loading Name');

    expect(result).toEqual({ type: SHOW_LOADING_MODAL, data: 'Loading Name' });
  });

  it('hideLoadingModal', () => {
    const result = hideLoadingModal('Loading Name');

    expect(result).toEqual({ type: HIDE_LOADING_MODAL, data: 'Loading Name' });
  });

  it('openSidePanel', () => {
    const result = openSidePanel(data);

    expect(result).toEqual({ type: OPEN_SIDE_PANEL });
  });

  it('closeSidePanel', () => {
    const result = closeSidePanel(data);

    expect(result).toEqual({ type: CLOSE_SIDE_PANEL });
  });

  it('loadCommand', async () => {
    loadCommand()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_COMMAND_RESULT, data: [ONE, TWO, THREE] });
    });
  });

  it('loadCommand - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadCommand()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('executeCommand', async () => {
    executeCommand('file', 'args')(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: EXECUTE_COMMAND_RESULT, data: 'test message' });
    });
  });

  it('executeCommand - error', async () => {
    api.get.mockRejectedValueOnce(error);
    executeCommand('file', 'args')(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_COMMAND_RESULT, error: error.message });
    });
  });

  it('clearCommand', () => {
    expect(clearCommand()).toEqual({ type: CLEAR_COMMAND_RESULT });
  });
});
