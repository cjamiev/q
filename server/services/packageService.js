const child_process = require('child_process');
const { promisify } = require('util');
const exec = child_process.exec;
const execPromisify = promisify(exec);
const {
  loadJSONFromFile,
  writeToFile
} = require('../utils/file');

const UTF8 = 'utf-8';
const DEFAULT_DIR = './';
const TWO = 2;

const getLatestDependencyVersions = async (packageJSON) => {
  const dependencies = Object.keys(packageJSON.dependencies);
  const devDependencies = Object.keys(packageJSON.devDependencies);

  const dependenciesLatestVersions = await Promise.all(
    dependencies.map(name => execPromisify(`npm view ${name} version`, { encoding: UTF8 }))
  );
  const devDependenciesLatestVersions = await Promise.all(
    devDependencies.map(name => execPromisify(`npm view ${name} version`, { encoding: UTF8 }))
  );

  const updatedDependencies = dependenciesLatestVersions
    .map((item, index) => {
      const name = dependencies[index];
      return { [name]: item.stdout.replace('\n','')};
    }).reduce((acc, item) => ({...acc,...item}));
  const updatedDevDependencies = devDependenciesLatestVersions
    .map((item, index) => {
      const name = devDependencies[index];
      return { [name]: item.stdout.replace('\n','')};
    }).reduce((acc, item) => ({...acc,...item}));

  return {
    dependencies: updatedDependencies,
    devDependencies: updatedDevDependencies
  };
};

const getPackageFile = (rootDir = DEFAULT_DIR) => {
  return loadJSONFromFile(`${rootDir}/package.json`, { error: true, message: 'file not found'});
};

const updatePackageFile = (rootDir = DEFAULT_DIR, packageJSON) => {
  return writeToFile(`${rootDir}/package.json`, JSON.stringify(packageJSON, undefined, TWO));
};

const runNpmScript = (rootDir = DEFAULT_DIR, script) => {
  exec(`cd ${rootDir} && npm run ${script}`, { encoding: UTF8 });
};

module.exports = {
  getPackageFile,
  getLatestDependencyVersions,
  updatePackageFile,
  runNpmScript
};