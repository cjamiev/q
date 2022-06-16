const {
  writeToFile,
  loadFile,
  readDirectory
} = require('../utils/file');
const {
  lowerCaseFirstLetter,
  capitalizeFirstLetter
} = require('../utils/stringHelper');

const TEMPLATE_DIR = './storage/io/templates';
const ONE = 1;

const createFilesFromTemplates = ({targetDir, filePaths, name}) => {
  filePaths.forEach(filePath => {
    const templateData = loadFile(`${TEMPLATE_DIR}/${filePath}`);
    const content = templateData
      .replace(/{{name}}/g, lowerCaseFirstLetter(name))
      .replace(/{{Name}}/g, capitalizeFirstLetter(name))
      .replace(/{{NAME}}/g, name.toUpperCase());
    const filePathSplit = filePath.split('\\');
    const fileName = filePathSplit[filePathSplit.length - ONE]
      .replace(/{{name}}/g, lowerCaseFirstLetter(name))
      .replace(/{{Name}}/g, capitalizeFirstLetter(name));

    writeToFile(`${targetDir}/${fileName}`, content);
  });
};

module.exports = { createFilesFromTemplates };