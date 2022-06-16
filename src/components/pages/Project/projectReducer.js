import { LOAD_PROJECT, CLEAR_MESSAGE } from './projectActions';
import {
  LOAD_REMOTE_URL,
  DELETE_BRANCH,
  CREATE_BRANCH,
  MERGE_BRANCH,
  SELECT_BRANCH,
  LOAD_BRANCHES,
  CREATE_STASH,
  DELETE_STASH,
  SELECT_STASH,
  LOAD_VIEW_STASH,
  RESET_BRANCH
} from 'components/molecules/ProjectGit/projectGitActions';
import {
  LOAD_PACKAGE,
  LOAD_VERSIONS,
  RUN_SCRIPT,
  UPDATE_PACKAGE
} from 'components/molecules/ProjectPackage/projectPackageActions';
import { UPDATE_FILES_BY_REGEX } from 'components/molecules/ProjectRegex/projectRegexActions';
import { LOAD_SNIPPET_DIRECTORY, LOAD_SNIPPET } from 'components/molecules/ProjectSnippet/projectSnippetActions';

export const projectInitialState = {
  directories: [],
  regexes: [],
  remoteUrl: '',
  branches: [],
  stashes: [],
  packageJson: {
    name: 'N/A',
    description: 'File Not Found',
    dependencies: {},
    devDependencies: {}
  },
  versions: {
    dependencies: {},
    devDependencies: {}
  },
  snippets: [],
  snippetFile: '',
  message: ''
};

const projectReducer = (state = projectInitialState, action) => {
  const projectCases = {
    [LOAD_PROJECT]: () => {
      return {
        ...state,
        directories: action.data.directories,
        regexes: action.data.regexes
      };
    },
    [LOAD_REMOTE_URL]: () => {
      return {
        ...state,
        remoteUrl: action.data.replace('\n', '')
      };
    },
    [DELETE_BRANCH]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [CREATE_BRANCH]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [MERGE_BRANCH]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [SELECT_BRANCH]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [LOAD_BRANCHES]: () => {
      return {
        ...state,
        branches: action.data
          .split('\n')
          .filter((item) => Boolean(item))
          .map((item) => item.replace(/[*]?[ ]*/g, ''))
      };
    },
    [CREATE_STASH]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [DELETE_STASH]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [SELECT_STASH]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [LOAD_VIEW_STASH]: () => {
      return {
        ...state,
        stashes: action.data.split('\n').filter(Boolean)
      };
    },
    [RESET_BRANCH]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [LOAD_PACKAGE]: () => {
      return {
        ...state,
        packageJson: action.data
      };
    },
    [LOAD_VERSIONS]: () => {
      return {
        ...state,
        versions: action.data
      };
    },
    [RUN_SCRIPT]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [UPDATE_PACKAGE]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [UPDATE_FILES_BY_REGEX]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [LOAD_SNIPPET_DIRECTORY]: () => {
      return {
        ...state,
        snippets: action.data
      };
    },
    [LOAD_SNIPPET]: () => {
      return {
        ...state,
        snippetFile: action.data
      };
    },
    [CLEAR_MESSAGE]: () => {
      return {
        ...state,
        message: ''
      };
    }
  };

  return projectCases.hasOwnProperty(action.type) ? projectCases[action.type]() : state;
};

export default projectReducer;
