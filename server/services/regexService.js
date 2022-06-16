const fs = require('fs');
const { resolve } = require('path');
const { isNumber } = require('../utils/dataHelper');

const UTF8 = 'utf-8';

async function* getFiles(rootPath) {
  const fileNames = await fs.promises.readdir(rootPath);
  for (const fileName of fileNames) {
    const path = resolve(rootPath, fileName);
    if ((await fs.promises.stat(path)).isDirectory()) {
      yield* getFiles(path);
    } else {
      yield path;
    }
  }
}

const updateFiles = async ({ rootDir, fileRegex, lineRegex, lineReplacer }) => {
  for await (const filePath of getFiles(rootDir)) {
    const matchedFile = filePath.match(fileRegex);

    if(matchedFile) {
      fs.readFile(filePath, UTF8, (err, data) => {
        const update = data.replace(lineRegex, lineReplacer);
        const writeStream = fs.createWriteStream(filePath, { flag: 'a'});

        writeStream.write(update);
      });
    }
  }
};

module.exports = { updateFiles };
