const { writeToFile, loadFile, readDirectory } = require('../utils/file');

const FILE_DIRECTORY = './storage/io/file';

const fileController = (name, { content, filename}) => {
  if (content && filename) {
    return writeToFile(`${FILE_DIRECTORY}/${filename}`, content);
  } else {
    const data = name
      ? loadFile(`${FILE_DIRECTORY}/${name}`)
      : readDirectory(FILE_DIRECTORY);

    return { data };
  }
};

module.exports = {
  fileController
};