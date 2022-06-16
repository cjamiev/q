const http = require('http');
const url = require('url');
const { router } = require('./router');

const DEFAULT_PORT = 1000;
const SECOND_ARGUMENT = 2;
const port = process.argv[SECOND_ARGUMENT] || DEFAULT_PORT;
const UTF8 = 'utf-8';
const STANDARD_HEADER = { 'Content-Type': 'application/json' };
const STATUS_OK = 200;
const STATUS_ERROR = 500;
const METHOD_POST = 'POST';

const cors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
};

const resolvePostBody = async (request) => {
  const promise = new Promise((resolve, reject) => {
    const queryData = [];
    request.on('data', (data) => {
      queryData.push(data);
    });

    request.on('end', () => {
      try {
        const result = queryData.length && JSON.parse(queryData.join().toString('utf8'));
        resolve(result);
      } catch (e) {
        resolve(e);
      }
    });
  });

  return await promise;
};

const send = (response, { data = {}, message = '', error = false }, { status, headers, body, shouldStringify = true } = {}) => {
  if(status, headers, body) {
    response.writeHead(status, headers);
    response.end(shouldStringify ? JSON.stringify(body): body, UTF8);
  } else {
    const STANDARD_STATUS = error ? STATUS_ERROR : STATUS_OK;

    response.writeHead(STANDARD_STATUS, STANDARD_HEADER);
    response.end(JSON.stringify({ data, message, error }), UTF8);
  }
};

const handleRequest = async (request, response) => {
  const queryParameters = url.parse(request.url, true).query;
  const payload = request.method === METHOD_POST ? await resolvePostBody(request) : {};

  const {
    data,
    message,
    error,
    status,
    headers,
    body,
    shouldStringify
  } = await router({ reqUrl: request.url, reqMethod: request.method, queryParameters, payload });
  send(response, { data, message, error }, { status, headers, body, shouldStringify });
};

http
  .createServer((request, response) => {
    cors(response);
    handleRequest(request, response);
  })
  .listen(parseInt(port));

console.log(`Server listening on port ${port}`);
