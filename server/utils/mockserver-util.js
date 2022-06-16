const { isBoolean, isNumber, isObject } = require('./dataHelper');
const { loadJSONFromFile, writeToFile, deleteFile } = require('./file');

const ONE = 1;
const ENTRY_ALREADY_EXISTS_MESSAGE = 'A mock with the specified method and url already exists.';
const CONFIG_SUCCESS_MESSAGE = 'Updated configuration';
const CONFIG_OVERRIDE_PATH = './storage/io/mockserver/config.json';
const MOCK_FILE_PATH = './storage/io/mockserver/responses';
const MOCK_REQUESTS_PATH = './storage/io/mockserver/mockPaths.json';
const LOGFILE_PATH = './storage/io/mockserver/log.json';
const DEFAULT_CONFIG = {
  delay: 0,
  delayUrls: [],
  log: false,
  error: false,
  overrideUrls: [],
  overrideStatusCode: 200,
  overrideResponse: {}
};

const loadMockRequests = () => {
  return loadJSONFromFile(MOCK_REQUESTS_PATH, []);
};

const loadMockResponse = (filepath) => {
  return loadJSONFromFile(filepath, []);
};

const getMatchedMockResponse = (url, method) => {
  const mockRequests = loadMockRequests();
  const matchedMockRequest = mockRequests.find((entry) => entry.url === url && entry.method === method);
  if (matchedMockRequest) {
    return loadMockResponse(matchedMockRequest.responsePath);
  }

  return null;
};

const updateMockRequests = (request, filename) => {
  const mockRequests = loadMockRequests();

  const matched = mockRequests.find((entry) => entry.url === request.url && entry.method === request.method);

  if (matched) {
    return ENTRY_ALREADY_EXISTS_MESSAGE;
  }

  const newEntry = {
    ...request,
    responsePath: MOCK_FILE_PATH + '/' + filename
  };

  const updatedMockRequests = mockRequests.concat([newEntry]);

  return writeToFile(MOCK_REQUESTS_PATH, JSON.stringify(updatedMockRequests));
};

const createMockFile = ({ content, filename }) => {
  const updateResult = updateMockRequests(content.request, filename);

  if (updateResult.error) {
    return { message: updateResult.message, error: true };
  } else {
    const { message, error } = writeToFile(MOCK_FILE_PATH + '/' + filename, JSON.stringify(content.response));

    return { message, error };
  }
};

const updateMockFile = ({ content }) => {
  const mockRequests = loadMockRequests();
  const matched = mockRequests.find(
    (entry) => entry.url === content.request.url && entry.method === content.request.method
  );

  const result = writeToFile(matched.responsePath, JSON.stringify(content.response));

  return result;
};

const removeMockRequestsEntry = ({ url, method, responsePath }) => {
  const mockRequests = loadMockRequests();

  const updatedMockRequests = !mockRequests.length
    ? []
    : mockRequests.filter((entry) => !(entry.url === url && entry.method === method));

  deleteFile(responsePath);

  return writeToFile(MOCK_REQUESTS_PATH, JSON.stringify(updatedMockRequests));
};

const constructValidConfig = (payloadConfig) => {
  const existingConfig = loadConfiguration();

  const delay = isNumber(payloadConfig.delay) ? payloadConfig.delay : existingConfig.delay;
  const delayUrls = Array.isArray(payloadConfig.delayUrls) ? payloadConfig.delayUrls : existingConfig.delayUrls;
  const log = isBoolean(payloadConfig.log) ? payloadConfig.log : existingConfig.log;
  const logfile = isBoolean(payloadConfig.logfile) ? payloadConfig.logfile : existingConfig.logfile;
  const error = isBoolean(payloadConfig.error) ? payloadConfig.error : existingConfig.error;
  const overrideUrls = Array.isArray(payloadConfig.overrideUrls)
    ? payloadConfig.overrideUrls
    : existingConfig.overrideUrls;
  const overrideStatusCode = isNumber(payloadConfig.overrideStatusCode)
    ? payloadConfig.overrideStatusCode
    : existingConfig.overrideStatusCode;
  const overrideResponse = isObject(payloadConfig.overrideResponse)
    ? payloadConfig.overrideResponse
    : existingConfig.overrideResponse;

  return {
    delay,
    delayUrls,
    log,
    logfile,
    error,
    overrideUrls,
    overrideStatusCode,
    overrideResponse
  };
};

const loadConfiguration = () => {
  const configFile = loadJSONFromFile(CONFIG_OVERRIDE_PATH, DEFAULT_CONFIG);
  const parsedConfigFile = {
    ...DEFAULT_CONFIG,
    ...configFile
  };

  return parsedConfigFile;
};

const updateConfiguration = (payloadConfig) => {
  const updatedConfig = constructValidConfig(payloadConfig);
  const result = writeToFile(CONFIG_OVERRIDE_PATH, JSON.stringify(updatedConfig));

  return result.error ? result : { message: CONFIG_SUCCESS_MESSAGE, error: false };
};

const loadLog = () => {
  return loadJSONFromFile(LOGFILE_PATH, []);
};

const logEntry = (url, payload) => {
  const date = new Date();
  const timestamp = `${
    date.getMonth() + ONE
  }/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const currentLog = loadLog();
  const updatedLog = currentLog.concat([{ timestamp, url, payload }]);

  return writeToFile(LOGFILE_PATH, JSON.stringify(updatedLog));
};

const clearLog = () => {
  return writeToFile(LOGFILE_PATH, JSON.stringify([]));
};

module.exports = {
  createMockFile,
  updateMockFile,
  removeMockRequestsEntry,
  loadMockRequests,
  loadMockResponse,
  getMatchedMockResponse,
  loadConfiguration,
  updateConfiguration,
  loadLog,
  logEntry,
  clearLog
};
