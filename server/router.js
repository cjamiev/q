const path = require('path');
const { projectController } = require('./controllers/projectController');
const { fileController } = require('./controllers/fileController');
const { databaseController } = require('./controllers/databaseController');
const { commandController } = require('./controllers/commandController');
const { staticController } = require('./controllers/staticController');

const router = async ({ reqUrl, reqMethod, queryParameters, payload }) => {
  if (reqUrl.includes('file')) {
    return await fileController(queryParameters.name, payload);
  } else if (reqUrl.includes('command')) {
    return await commandController(queryParameters);
  } else if (reqUrl.includes('db')) {
    return await databaseController(queryParameters.name, payload);
  } else if (reqUrl.includes('project')) {
    return await projectController(queryParameters, payload);
  } else {
    return await staticController(reqUrl);
  }
};

module.exports = {
  router
};
