const fs = require('fs');
const path = require('path');
const { isJSONString } = require('./dataHelper');
const { drop, flattenDeep } = require('./arrayHelper');

const UTF8_ENCODING = 'utf8';

const doesFileExist = filepath => fs.existsSync(filepath);

const loadFile = (filepath, defaultValue) => {
  return fs.existsSync(filepath) ? fs.readFileSync(filepath, UTF8_ENCODING) : defaultValue;
};

const loadJSONFromFile = (filepath, defaultValue) => {
  const file = loadFile(filepath, defaultValue);

  if (isJSONString(file)) {
    return JSON.parse(file);
  }

  return defaultValue;
};

const readDirectory = dir => fs.readdirSync(dir);

const readDirectoryDeep = dir => {
  const files = fs.readdirSync(dir).reduce((accumulator, file) => {
    const list = fs.statSync(path.join(dir, file)).isDirectory()
      ? readDirectoryDeep(path.join(dir, file))
      : path.join(dir, file);
    return [...accumulator, list];
  }, []);

  return flattenDeep(files);
};

const deleteFile = filepath => {
  try {
    fs.existsSync(filepath) && fs.unlinkSync(filepath);
    return {
      error: false,
      message: 'Deleted file:' + filepath
    };
  } catch (e) {
    return {
      error: true,
      message: e
    };
  }
};

const removeDirectory = folderpath => {
  try {
    fs.existsSync(folderpath) && fs.rmdirSync(folderpath);
    return {
      error: false,
      message: 'Removed folderpath:' + folderpath
    };
  } catch (e) {
    return {
      error: true,
      message: e
    };
  }
};

const removeDirectoryDeep = filepath => {
  if (fs.existsSync(filepath)) {
    fs.readdirSync(filepath).forEach(file => {
      const curPath = filepath + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDirectoryDeep(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(filepath);
  }
};

const writeToFile = (filepath, content) => {
  try {
    fs.writeFileSync(filepath, content);
    return {
      error: false,
      message: 'Wrote to file:' + filepath
    };
  } catch (e) {
    return {
      error: true,
      message: e
    };
  }
};

const copyFile = (file, targetPath, seperator = '/') => {
  const content = loadFile(file);

  const paths = targetPath.split(seperator);
  let curPath = '';

  paths.forEach(nextPath => {
    curPath = path.join(curPath, nextPath);
    if (!curPath.includes('.')) {
      makeDirectory(curPath);
    }
  });

  return writeToFile(targetPath, content);
};

const makeDirectory = folderpath => {
  try {
    !fs.existsSync(folderpath) && fs.mkdirSync(folderpath);
    return {
      error: false,
      message: 'Created directory:' + folderpath
    };
  } catch (e) {
    return {
      error: true,
      message: e
    };
  }
};

const copyDir = (dir, targetPath) => {
  const root = drop(dir.split('/').reverse())
    .reverse()
    .join('\\');
  const files = readDirectoryDeep(dir);

  files.forEach(file => {
    const location = path.join(targetPath, file.replace(`${root}`, ''));
    copyFile(file, location, '\\');
  });
};

module.exports = {
  doesFileExist,
  loadFile,
  loadJSONFromFile,
  readDirectory,
  readDirectoryDeep,
  deleteFile,
  removeDirectory,
  removeDirectoryDeep,
  copyFile,
  copyDir,
  makeDirectory,
  writeToFile
};
