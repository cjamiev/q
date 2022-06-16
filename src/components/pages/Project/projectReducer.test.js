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
import projectReducer, { projectInitialState } from './projectReducer';

const remoteUrl = 'test-url';
const message = 'test-message';
const packageJson = { one: 1, two: 2, three: 3 };
const versions = { one: 2, two: 3, three: 4 };
const templates = ['template/one', 'template/two'];
const snippets = ['snippetOne', 'snippetTwo'];
const projectDb = {
  directories: ['./', 'C:/doc'],
  regexes: [
    {
      description: 'reduce svg icon numbers to three decimals',
      fileRegex: 'Icon.js$',
      lineRegex: '[.][0-9]{2,}',
      modifiers: 'g',
      lineRange: {
        start: 0,
        end: 3
      },
      replace: ''
    }
  ]
};

describe('projectReducer', () => {
  it('default', () => {
    const result = projectReducer(undefined, {});

    expect(result).toEqual(projectInitialState);
  });

  it('LOAD_PROJECT', () => {
    const action = {
      type: LOAD_PROJECT,
      data: projectDb
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      directories: projectDb.directories,
      regexes: projectDb.regexes
    });
  });

  it('LOAD_REMOTE_URL', () => {
    const action = {
      type: LOAD_REMOTE_URL,
      data: remoteUrl
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      remoteUrl
    });
  });

  it('DELETE_BRANCH', () => {
    const action = {
      type: DELETE_BRANCH,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('CREATE_BRANCH', () => {
    const action = {
      type: CREATE_BRANCH,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('MERGE_BRANCH', () => {
    const action = {
      type: MERGE_BRANCH,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('SELECT_BRANCH', () => {
    const action = {
      type: SELECT_BRANCH,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('LOAD_BRANCHES', () => {
    const action = {
      type: LOAD_BRANCHES,
      data: '* master\n   branch1\n'
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      branches: ['master', 'branch1']
    });
  });

  it('CREATE_STASH', () => {
    const action = {
      type: CREATE_STASH,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('DELETE_STASH', () => {
    const action = {
      type: DELETE_STASH,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('SELECT_STASH', () => {
    const action = {
      type: SELECT_STASH,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('LOAD_VIEW_STASH', () => {
    const action = {
      type: LOAD_VIEW_STASH,
      data: 'stash1\nstash2'
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      stashes: ['stash1', 'stash2']
    });
  });

  it('RESET_BRANCH', () => {
    const action = {
      type: RESET_BRANCH,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('LOAD_PACKAGE', () => {
    const action = {
      type: LOAD_PACKAGE,
      data: packageJson
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      packageJson
    });
  });

  it('LOAD_VERSIONS', () => {
    const action = {
      type: LOAD_VERSIONS,
      data: versions
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      versions
    });
  });

  it('RUN_SCRIPT', () => {
    const action = {
      type: RUN_SCRIPT,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('UPDATE_PACKAGE', () => {
    const action = {
      type: UPDATE_PACKAGE,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('UPDATE_FILES_BY_REGEX', () => {
    const action = {
      type: UPDATE_FILES_BY_REGEX,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('LOAD_SNIPPET_DIRECTORY', () => {
    const action = {
      type: LOAD_SNIPPET_DIRECTORY,
      data: snippets
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      snippets
    });
  });

  it('LOAD_SNIPPET', () => {
    const action = {
      type: LOAD_SNIPPET,
      data: 'content'
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      snippetFile: action.data
    });
  });

  it('CLEAR_MESSAGE', () => {
    const action = {
      type: CLEAR_MESSAGE
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message: ''
    });
  });
});
