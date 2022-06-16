const { writeToFile, loadFile, readDirectory } = require('../utils/file');

const DB_DIRECTORY = './storage/io/db';

const databaseController = (name, { content, filename}) => {
  if (content && filename) {
    return writeToFile(`${DB_DIRECTORY}/${filename}`, content);
  } else if (name) {
    const data = name
      ? loadFile(`${DB_DIRECTORY}/${name}`)
      : readDirectory(DB_DIRECTORY);

    return { data };
  } else {
    return { error: { message: 'missing one of name or content & filename for database op'} };
  }
};

module.exports = {
  databaseController
};