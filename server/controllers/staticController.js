const fs = require('fs');
const path = require('path');

const ROOT_DIR = './server/static/';
const UTF8 = 'utf-8';
const TYPE_OCTET = 'application/octet-stream';
const mimeTypes = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword'
};
const STANDARD_HEADER = { 'Content-Type': 'application/json' };
const STATUS_OK = 200;
const STATUS_ERROR = 500;
const NOT_FOUND = 'Not found';

const staticController = async (reqUrl) => {
  const filePath = ROOT_DIR + reqUrl;
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || TYPE_OCTET;

  return await new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, content) => {
      if (error) {
        resolve({ message: NOT_FOUND, error: true });
      } else {
        resolve({ status: STATUS_OK, headers: { 'Content-Type': contentType }, body: content, shouldStringify: false });
      }
    });
  });
};

module.exports = {
  staticController
};