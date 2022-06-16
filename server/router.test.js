const fs = require('fs');
const child_process = require('child_process');
const { router } = require('./router');

const mockFiles = {
  fileOne: 'fileOne content',
  fileTwo: 'fileTwo content'
};
const mockCommands = {
  commandOne: 'commandOne',
  commandTwo: 'commandTwo'
};
const mockDbs = {
  dbOne: 'dbOne content',
  dbTwo: 'dbTwo content'
};

jest.mock('fs');
fs.existsSync = (filepath) => {
  return true;
};
fs.readFileSync = (filepath, encoding) => {
  if(filepath.includes('./storage/io/file/')){
    const filename = filepath.replace('./storage/io/file/','');

    return mockFiles.hasOwnProperty(filename) ? mockFiles[filename] : 'file not found';
  }
  else if(filepath.includes('./storage/io/db/')) {
    const filename = filepath.replace('./storage/io/db/','');

    return mockDbs.hasOwnProperty(filename) ? mockDbs[filename] : 'file not found';
  }
};
fs.readdirSync = (dir) => {
  if(dir.includes('./storage/io/file')) {
    return Object.keys(mockFiles);
  } else if(dir.includes('./storage/io/command')) {
    return Object.keys(mockCommands);
  }
};
fs.promises = {
  readdir: (dir) => {
    return new Promise((resolve, reject) => { resolve(Object.keys(mockFiles));});
  },
  stat: (filepath) => {
    return new Promise((resolve, reject) => resolve(false));
  }
};
fs.writeFileSync = (filepath, content) => {
  return `wrote file ${filepath} with content ${content}`;
};
jest.mock('child_process');
child_process.exec.mockImplementation((command, encoding, callback) => callback(null, `running command ${command}`));
child_process.execSync = (command) => {
  return `running command ${command}`;
};

describe('router', () => {
  it('file/?name=fileOne', async () => {
    const result = await router({ reqUrl: 'basepath/file', reqMethod: 'GET', queryParameters: { name: 'fileOne'}, payload: {}});

    expect(result).toEqual({ data: mockFiles.fileOne });
  });

  it('file', async () => {
    const result = await router({ reqUrl: 'basepath/file', reqMethod: 'GET', queryParameters: {}, payload: {}});

    expect(result).toEqual({ data: Object.keys(mockFiles) });
  });

  it('file post', async () => {
    const result = await router({ reqUrl: 'basepath/file', reqMethod: 'POST', queryParameters: {}, payload: { filename: 'fileOne', content: 'fileOne Contents'}});

    expect(result).toEqual({ message: 'Wrote to file:./storage/io/file/fileOne', error: false });
  });

  it('command/?name=commandOne', async () => {
    const result = await router({ reqUrl: 'basepath/command', reqMethod: 'GET', queryParameters: { name: 'commandOne'}, payload: {}});

    expect(result).toEqual('running command cd ./storage/io/command && commandOne undefined');
  });

  it('command', async () => {
    const result = await router({ reqUrl: 'basepath/command', reqMethod: 'GET', queryParameters: { }, payload: {}});

    expect(result).toEqual({ data: Object.keys(mockCommands) });
  });

  it('db/?name=dbOne', async () => {
    const result = await router({ reqUrl: 'basepath/db', reqMethod: 'GET', queryParameters: { name: 'dbOne'}, payload: {}});

    expect(result).toEqual({ data: mockDbs.dbOne });
  });

  it('db post', async () => {
    const result = await router({ reqUrl: 'basepath/db', reqMethod: 'POST', queryParameters: {}, payload: { filename: 'dbOne', content: 'dbOne Contents'}});

    expect(result).toEqual({ message: 'Wrote to file:./storage/io/db/dbOne', error: false });
  });
});