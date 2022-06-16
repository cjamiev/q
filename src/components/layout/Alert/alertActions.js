const CREATE_ALERT = 'CREATE_ALERT';
const DISMISS_ALERT = 'DISMISS_ALERT';

const createAlert = (data) => ({ type: CREATE_ALERT, data });
const dismissAlert = (id) => ({ type: DISMISS_ALERT, id });

export { CREATE_ALERT, DISMISS_ALERT, createAlert, dismissAlert };
