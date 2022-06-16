const {
  logEntry,
  getMatchedMockResponse,
  loadConfiguration
} = require('../utils/mockserver-util');
const { isEqual } = require('../utils/dataHelper');

const MOCK_SERVER_ERROR = 'mock server error has occurred';
const UTF8 = 'utf-8';
const NOT_FOUND = 'Not found';

const handleMockResponse = ({ payload, reqUrl, method }) => {
  const matchedResponse = getMatchedMockResponse(reqUrl, method);

  if (matchedResponse && matchedResponse.conditionalResponse) {
    const matchedConditionalResponse = matchedResponse.conditionalResponse.find((item) =>
      isEqual(item.payload, payload)
    );
    const responsePayload = (matchedConditionalResponse && matchedConditionalResponse.body) || matchedResponse.body;

    return { ...matchedResponse, body: responsePayload };
  } else if (matchedResponse) {
    return matchedResponse;
  } else {
    return { message: NOT_FOUND, error: true };
  }
};

const mockController = async (reqUrl, reqMethod, payload) => {
  const { delay, delayUrls, error, log, overrideUrls, overrideStatusCode, overrideResponse } = loadConfiguration();
  const shouldDelayAllUrls = !delayUrls.length;
  const shouldDelayThisUrl = delayUrls.some((item) => item === reqUrl);
  const matchedUrl = overrideUrls.some((endpoint) => endpoint === reqUrl);

  if (log) {
    return logEntry(reqUrl, payload);
  }
  if (error) {
    return { message: MOCK_SERVER_ERROR, error: true };
  } else if (matchedUrl) {
    return { status: overrideStatusCode, headers: STANDARD_HEADER, body: overrideResponse };
  } else if (shouldDelayAllUrls || shouldDelayThisUrl) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(handleMockResponse({ payload, reqUrl, method: reqMethod }));
      }, delay);
    });
  } else {
    return handleMockResponse({ payload, reqUrl, method: reqMethod });
  }
};

module.exports = {
  mockController
};