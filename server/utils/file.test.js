import {
  doesFileExist,
  readDirectoryDeep,
  readDirectory,
  loadFile,
  loadJSONFromFile,
  deleteFile,
  removeDirectory,
  removeDirectoryDeep,
  copyFile,
  copyDir,
  makeDirectory,
  writeToFile
} from './file';

const dummyDir = 'tmp/dummy';
const copyTestDir = 'tmp/copyTest';

beforeAll(() => {
  const pathOne = 'tmp/dummy/dummy1';
  const pathOneFileOne = 'tmp/dummy/dummy1/testOne.json';
  const pathTwo = 'tmp/dummy/dummy2';
  const pathTwoFileOne = 'tmp/dummy/dummy2/testOne.json';
  const pathTwoFileTwo = 'tmp/dummy/dummy2/testTwo.json';
  const content = {
    id: 1,
    name: 'name1',
    flag: true
  };

  makeDirectory(dummyDir);
  makeDirectory(pathOne);
  makeDirectory(pathTwo);
  writeToFile(pathOneFileOne, JSON.stringify(content));
  writeToFile(pathTwoFileOne, JSON.stringify(content));
  writeToFile(pathTwoFileTwo, JSON.stringify(content));
});

afterAll(() => {
  removeDirectoryDeep(dummyDir);
  removeDirectoryDeep(copyTestDir);
});

describe('fileHelper: CRUD operation test', () => {
  it('should be able to create a directory', () => {
    const newDir = 'tmp/createDirTest';

    const makeDirExpectedResult = makeDirectory(newDir);
    const removeExpectedResult = removeDirectory(newDir);

    expect(makeDirExpectedResult.error).toBeFalsy();
    expect(removeExpectedResult.error).toBeFalsy();
  });

  it('check update file, load file and delete file', () => {
    const file = 'tmp/createFileTest.txt';
    const content = 'this is a test message';

    const updateExpectedResult = writeToFile(file, content);
    const loadExpectedResult = loadFile(file, null);
    const fileExistExpectedResult = doesFileExist(file);
    const deleteExpectedResult = deleteFile(file);

    expect(updateExpectedResult.error).toBeFalsy();
    expect(loadExpectedResult).toEqual(content);
    expect(fileExistExpectedResult).toBeTruthy();
    expect(doesFileExist(file)).toBeFalsy();
    expect(updateExpectedResult.error).toBeFalsy();
  });

  it('should work with JSON file', () => {
    const file = 'tmp/createJSONFileTest.json';
    const content = {
      id: 1,
      name: 'name1',
      flag: true
    };

    const updateExpectedResult = writeToFile(file, JSON.stringify(content));
    const loadExpectedResult = loadJSONFromFile(file, {});
    const fileExistExpectedResult = doesFileExist(file);
    const deleteExpectedResult = deleteFile(file);

    expect(updateExpectedResult.error).toBeFalsy();
    expect(loadExpectedResult).toEqual(content);
    expect(fileExistExpectedResult).toBeTruthy();
    expect(doesFileExist(file)).toBeFalsy();
    expect(deleteExpectedResult.error).toBeFalsy();
  });

  it('should be able to copy an existing file', () => {
    const file = 'tmp/fileToCopyFrom.txt';
    const copiedFile = 'tmp/fileToCopyTo.txt';
    const content = 'this is a test message';

    const updateExpectedResult = writeToFile(file, content);
    const copyExpectedResult = copyFile(file, copiedFile);
    const loadExpectedResult = loadFile(copiedFile, null);
    deleteFile(file);
    deleteFile(copiedFile);

    expect(updateExpectedResult.error).toBeFalsy();
    expect(copyExpectedResult.error).toBeFalsy();
    expect(loadExpectedResult).toEqual(content);
  });
});

describe('fileHelper: operations should fail for non-existant files/folders', () => {
  it('should not be able to make a folder in a non-existant folder', () => {
    const updateExpectedResult = makeDirectory('tmp/non-existant/test');

    expect(updateExpectedResult.error).toBeTruthy();
  });

  it('should handle removing a non-existant folder gracefully', () => {
    const updateExpectedResult = removeDirectory('tmp/non-existant/test');

    expect(updateExpectedResult.error).toBeFalsy();
  });

  it('should not be able to write to non-existant folder', () => {
    const file = 'tmp/non-existant/test.txt';
    const content = 'this is a test message';

    const updateExpectedResult = writeToFile(file, content);

    expect(updateExpectedResult.error).toBeTruthy();
  });

  it('should not be able to read non-existant file', () => {
    const file = 'tmp/non-existant/test.txt';

    const loadExpectedResult = loadJSONFromFile(file, {});

    expect(loadExpectedResult).toEqual({});
  });

  it('should handle deleting non-existant file gracefully', () => {
    const file = 'tmp/non-existant/test.txt';

    const deleteExpectedResult = deleteFile(file);

    expect(deleteExpectedResult.error).toBeFalsy();
  });
});

describe('fileHelper: Read directory', () => {
  it('should read directory structure correctly', () => {

    const expectedResult = [
      'tmp\\dummy\\dummy1\\testOne.json',
      'tmp\\dummy\\dummy2\\testOne.json',
      'tmp\\dummy\\dummy2\\testTwo.json'
    ];

    const files = readDirectoryDeep(dummyDir);

    expect(files).toEqual(expectedResult);
  });

  it('should retrieve all directories correctly', () => {
    const expectedResult = ['dummy1', 'dummy2'];

    const folders = readDirectory(dummyDir);

    expect(folders).toEqual(expectedResult);
  });
});

describe('fileHelper: Copy directory', () => {
  it('should copy entire directory', () => {

    const expectedResult = [
      'tmp\\copyTest\\dummy1\\testOne.json',
      'tmp\\copyTest\\dummy2\\testOne.json',
      'tmp\\copyTest\\dummy2\\testTwo.json'
    ];

    copyDir(dummyDir, copyTestDir);
    const receivedResult = readDirectoryDeep(copyTestDir);

    expect(receivedResult).toEqual(expectedResult);
  });
});