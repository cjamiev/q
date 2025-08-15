import fs from 'node:fs';

const UTF8_ENCODING = 'utf8';

export const loadFile = (filepath, defaultValue) => {
  return fs.existsSync(filepath) ? fs.readFileSync(filepath, UTF8_ENCODING) : defaultValue;
};

export const writeToFile = (filepath, content) => {
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
