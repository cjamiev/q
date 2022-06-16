const {
  createMockFile,
  updateMockFile,
  removeMockRequestsEntry,
  loadMockRequests,
  loadMockResponse,
  loadConfiguration,
  updateConfiguration,
  loadLog,
  logEntry,
  clearLog
} = require('../utils/mockserver-util');
const { isEmpty } = require('../utils/dataHelper');

const handleMockServerPostResponses = (url, payload) => {
  if (url.includes('config')) {
    return updateConfiguration(payload);
  } else if (url.includes('loadMockResponse')) {
    const data = loadMockResponse(payload.responsePath);

    return { data };
  } else if (url.includes('deleteMockEndpoint')) {
    return removeMockRequestsEntry(payload);

  } else if (url.includes('createMockEndpoint')) {
    return createMockFile(payload);

  } else if (url.includes('updateMockEndpoint')) {
    return updateMockFile(payload);
  }
};

const mockserverController = (url, payload) => {
  if (!isEmpty(payload)) {
    return handleMockServerPostResponses(url, payload);
  } else if (url.includes('config')) {
    const data = loadConfiguration();

    return { data };
  } else if (url.includes('mockRequests')) {
    const data = loadMockRequests();

    return { data };
  } else if (url.includes('clearLog')) {
    return clearLog();
  } else if (url.includes('loadLog')) {
    const data = loadLog();

    return { data };
  }
};

module.exports = {
  mockserverController
};