const execSync = require('child_process').execSync;

const UTF8 = 'utf-8';

const executeCommand = (command) => {
  try {
    return execSync(command, { encoding: UTF8 });
  } catch(e) {
    return e.stderr;
  }
};

module.exports = {
  executeCommand
};