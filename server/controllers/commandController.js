const child_process = require('child_process');
const exec = child_process.exec;
const { readDirectory } = require('../utils/file');

const COMMAND_DIRECTORY = './storage/io/command';
const UTF8 = 'utf-8';

// windows cmd /c vs /k  auto close vs left open
const getExecCommand = ({ name, args }) => {
  const command = name.includes('.sh') ? `sh ${name}` : name;

  return `cd ${COMMAND_DIRECTORY} && ${command} ${args}`;
};

const commandController = async (queryParams) => {
  if (queryParams.name) {
    return await new Promise((resolve, reject) => {
      exec(getExecCommand(queryParams), { encoding: UTF8 }, (error, stdout, stderr) => {
        if (error) {
          reject(error || stderr);
        } else {
          resolve(stdout);
        }
      });
    });
  } else {
    const data = readDirectory(COMMAND_DIRECTORY);

    return { data };
  }
};

module.exports = {
  commandController
};
