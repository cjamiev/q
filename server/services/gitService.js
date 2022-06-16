const { executeCommand } = require('../services/execService');

const DEFAULT_DIR = './';
const getRemoteUrl = (rootDir = DEFAULT_DIR) => {
  return executeCommand(`cd ${rootDir} && git config remote.origin.url`);
};

const resetBranch = (rootDir = DEFAULT_DIR) => {
  return executeCommand(`cd ${rootDir} && git reset --hard`);
};

const deleteBranch = (rootDir = DEFAULT_DIR, branchname) => {
  if(branchname) {
    return executeCommand(`cd ${rootDir} && git branch -D ${branchname}`);
  }
  return 'Missing branchname';
};

const createBranch = (rootDir = DEFAULT_DIR, branchname) => {
  if(branchname) {
    return executeCommand(`cd ${rootDir} && git checkout -b ${branchname}`);
  }
  return 'Missing branchname';
};

const mergeBranch = (rootDir = DEFAULT_DIR, branchname) => {
  if(branchname) {
    return executeCommand(`cd ${rootDir} && git merge ${branchname}`);
  }
  return 'Missing branchname';
};

const selectBranch = (rootDir = DEFAULT_DIR, branchname) => {
  if(branchname) {
    return executeCommand(`cd ${rootDir} && git checkout ${branchname}`);
  }
  return 'Missing branchname';
};

const viewBranches = (rootDir = DEFAULT_DIR) => {
  return executeCommand(`cd ${rootDir} && git branch`);
};

const createStash = (rootDir = DEFAULT_DIR, stashname) => {
  if(stashname){
    return executeCommand(`cd ${rootDir} && git stash push -m ${stashname}`);
  }
  return executeCommand(`cd ${rootDir} && git stash`);
};

const deleteStash = (rootDir = DEFAULT_DIR, stashname) => {
  if(stashname){
    return executeCommand(`cd ${rootDir} && git stash drop stash@{${stashname}}`);
  }
  return executeCommand(`cd ${rootDir} && git stash`);
};

const selectStash = (rootDir = DEFAULT_DIR, stashname) => {
  if(stashname) {
    return executeCommand(`cd ${rootDir} && git stash apply ${stashname}`);
  }
  return executeCommand(`cd ${rootDir} && git stash apply`);
};

const viewStash = (rootDir = DEFAULT_DIR) => {
  return executeCommand(`cd ${rootDir} && git stash list`);
};

const gitReadOps = {
  'remoteurl':getRemoteUrl,
  'viewbranches':viewBranches,
  'viewstash':viewStash
};
const gitWriteOps = {
  'deletebranch':deleteBranch,
  'createbranch':createBranch,
  'mergebranch':mergeBranch,
  'selectbranch':selectBranch,
  'createstash':createStash,
  'deletestash':deleteStash,
  'selectstash':selectStash,
  'resetbranch':resetBranch
};

module.exports = {
  gitReadOps,
  gitWriteOps
};