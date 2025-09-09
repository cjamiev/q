import { LOAD_PROJECT, CLEAR_MESSAGE } from './projectActions';
import {
  LOAD_PACKAGE,
  LOAD_VERSIONS,
  RUN_SCRIPT,
  UPDATE_PACKAGE
} from '../../../components/molecules/ProjectPackage/projectPackageActions';
import { LOAD_SNIPPET_DIRECTORY, LOAD_SNIPPET } from '../../../components/molecules/ProjectSnippet/projectSnippetActions';

export const projectInitialState = {
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
