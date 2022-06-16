import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { fullTestWrapper, reduxTestWrapper, mockApi, mockGet, mockPost, mockStore } from 'testHelper';
import Project from 'components/pages/Project';
import api from 'api';
import { ROUTES } from 'constants/routes';
import { TIME } from 'constants/time';

const packageJson = mockStore.project.packageJson;
const versions = mockStore.project.versions;
const projectDb = {
  directories: mockStore.project.directories,
  regexes: mockStore.project.regexes
};
const incorrectDirData = 'The system cannot find the path specified.';

const apiMock = mockApi(mockGet, mockPost);

const ZERO = 0;
const ONE = 1;
const rootDir = './';
const name = 'test-stash';
const defaultStoreProps = {
  project: {
    directories: [],
    regexes: [],
    remoteUrl: 'test-url',
    branches: [],
    stashes: [],
    packageJson,
    versions,
    message: ''
  }
};

describe('ProjectPackage', () => {
  it('should render package deps', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const packageTab = screen.getByText('Npm');
    fireEvent.click(packageTab);

    Object.keys(packageJson.devDependencies).forEach((depName) => {
      expect(screen.queryByText(depName)).toBeInTheDocument();
      expect(screen.queryByText(packageJson.devDependencies[depName])).toBeInTheDocument();
    });
    Object.keys(packageJson.dependencies).forEach((depName) => {
      expect(screen.queryByText(depName)).toBeInTheDocument();
      expect(screen.queryByText(packageJson.dependencies[depName])).toBeInTheDocument();
    });
  });

  it('handle load versions and update versions', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const packageTab = screen.getByText('Npm');
    fireEvent.click(packageTab);

    const versionBtn = screen.getByText('Load Versions');
    const updateBtn = screen.getByText('Update Versions');
    fireEvent.click(versionBtn);

    Object.keys(versions.devDependencies).forEach((depName) => {
      expect(screen.queryByText(depName)).toBeInTheDocument();
      expect(screen.queryByText(versions.devDependencies[depName])).toBeInTheDocument();
    });
    Object.keys(versions.dependencies).forEach((depName) => {
      expect(screen.queryByText(depName)).toBeInTheDocument();
      expect(screen.queryByText(versions.dependencies[depName])).toBeInTheDocument();
    });

    expect(apiMock.get).toHaveBeenCalledWith('/project/?type=package&op=getversions&root=./');

    // Select and deselect test-dev-dep 1.0.1 and select test-dep 3.0.1
    fireEvent.click(screen.getByText('1.0.1'));
    fireEvent.click(screen.getByText('3.0.1'));
    fireEvent.click(screen.getByText('1.0.1'));
    fireEvent.click(updateBtn);

    expect(apiMock.post).toHaveBeenCalledWith(
      '/project/?type=package&op=update&root=./',
      JSON.stringify({
        ...packageJson,
        dependencies: {
          'test-dep': '3.0.1',
          'test-dep2': '4.0.0'
        }
      })
    );
  });

  it('handle script and modal message', async () => {
    fullTestWrapper(Project, {}, defaultStoreProps, ROUTES.PROJECT.url);

    const packageTab = screen.getByText('Npm');
    fireEvent.click(packageTab);

    const scriptBtn = screen.getByText('test-script');
    fireEvent.click(scriptBtn);

    expect(apiMock.get).toHaveBeenCalledWith('/project/?type=package&op=runscript&root=./&content=test-script');
  });
});
