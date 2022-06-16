const { writeToFile, loadFile, readDirectory, deleteFile } = require('../utils/file');
const { gitReadOps, gitWriteOps } = require('../services/gitService');
const {
  getPackageFile,
  getLatestDependencyVersions,
  updatePackageFile,
  runNpmScript
} = require('../services/packageService');
const { updateFiles } = require('../services/regexService');
const { createFilesFromTemplates } = require('../services/templateService');

const runGitOperation = (op, root, name) => {
  if (gitWriteOps.hasOwnProperty(op)) {
    const message = gitWriteOps[op](root, name);

    return { message };
  } else if (gitReadOps.hasOwnProperty(op)) {
    const data = gitReadOps[op](root);

    return { data };
  } else {
    return { message: 'git operation not found' };
  }
};

const runPackageOperation = async (op, root, content) => {
  if (op === 'read') {
    const data = getPackageFile(root);
    if (data.error) {
      return { error: data.error, message: data.message };
    }

    return { data };
  } else if (op === 'getversions') {
    const packageJson = getPackageFile(root);
    const data = await getLatestDependencyVersions(packageJson);

    return { data };
  } else if (op === 'update') {
    const { error, message } = updatePackageFile(root, content);

    return { error, message };
  } else if (op === 'runscript') {
    runNpmScript(root, content);

    return { message: `Running Script ${content}` };
  } else {
    return { message: 'package operation not found' };
  }
};

const runRegexOperation = (root, content) => {
  const { fileRegex, lineRegex, modifiers, lineRange, replace = '' } = content;
  const { start, end } = lineRange;
  const lineReplacer =
    isNumber(start) && isNumber(end) ? (matchedKey) => matchedKey.substr(start, end) + replace : replace;

  try {
    updateFiles({
      rootDir: root,
      fileRegex: new RegExp(fileRegex),
      lineRegex: new RegExp(lineRegex, modifiers),
      lineReplacer
    });

    return { message: 'Regex Operation Executing' };
  } catch (e) {
    return { message: e.stderr };
  }
};

const SNIPPET_DIR = './storage/io/snippets';
const runSnippetOperation = (op, filename, content) => {
  if (op === 'read') {
    const data = filename ? loadFile(`${SNIPPET_DIR}/${filename}`) : readDirectory(SNIPPET_DIR);

    return { data };
  }
  if (op === 'write') {
    const { message, error } = writeToFile(`${SNIPPET_DIR}/${filename}`, content);

    return { message, error };
  }
  if (op === 'delete') {
    const { message, error } = deleteFile(`${SNIPPET_DIR}/${filename}`);

    return { message, error };
  } else {
    return { message: 'snippet operation not found' };
  }
};

const TEMPLATE_DIR = './storage/io/templates';
const runTemplateOperation = (op, { targetDir, content, name }) => {
  if (op === 'create') {
    createFilesFromTemplates({ targetDir, name, filePaths: content });

    return { message: 'Creating templates' };
  } else if (op === 'read') {
    const data = name ? loadFile(`${TEMPLATE_DIR}/${name}`) : readDirectory(TEMPLATE_DIR);

    return { data };
  } else if (op === 'write') {
    const { message, error } = writeToFile(`${TEMPLATE_DIR}/${name}`, content);

    return { message, error };
  } else {
    return { message: 'template operation not found' };
  }
};

const projectController = async ({ type, op, root, name, content }, payload) => {
  const data = payload ? payload : content;

  if (type === 'git') {
    return runGitOperation(op, root, name);
  } else if (type === 'package') {
    return await runPackageOperation(op, root, data);
  } else if (type === 'template') {
    return runTemplateOperation(op, { targetDir: root, name, content: data });
  } else if (type === 'regex') {
    return runRegexOperation(root, data);
  } else if (type === 'snippet') {
    return runSnippetOperation(op, name, data);
  } else {
    return { error: { message: 'project type not found' } };
  }
};

module.exports = {
  projectController
};
