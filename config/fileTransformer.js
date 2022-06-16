const path = require('path');

module.exports = {
  process(react, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  }
};
