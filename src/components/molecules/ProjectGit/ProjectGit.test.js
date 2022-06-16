import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, mockApi, mockGet, mockPost } from 'testHelper';
import Project from 'components/pages/Project';
import api from 'api';

const apiMock = mockApi(mockGet, mockPost);

const ZERO = 0;
const rootDir = './';
const name = 'test-stash';
const defaultStoreProps = {
  project: {
    directories: [],
    regexes: [],
    remoteUrl: 'test-url',
    branches: ['branch1', 'branch2'],
    stashes: ['stash{1}', 'stash{2}'],
    packageJson: {},
    versions: {},
    message: ''
  }
};

// act warnings
describe('ProjectGit', () => {
  it('switch branch', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    fireEvent.click(screen.getByText('branch1'));
    fireEvent.click(screen.getByText('Checkout'));

    expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=selectbranch&root=${rootDir}&name=branch1`);
  });

  it('delete branch', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    fireEvent.click(screen.getByText('branch1'));
    fireEvent.click(screen.getByText('Delete'));

    expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=deletebranch&root=${rootDir}&name=branch1`);
  });

  it('merge branch', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const nameField = screen.getByLabelText('Name text field');

    fireEvent.change(nameField, { target: { value: name } });
    fireEvent.click(screen.getByText('Merge'));

    expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=mergebranch&root=${rootDir}&name=${name}`);
  });

  it('create branch', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const nameField = screen.getByLabelText('Name text field');

    fireEvent.change(nameField, { target: { value: name } });
    fireEvent.click(screen.getByText('Create'));

    expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=createbranch&root=${rootDir}&name=${name}`);
  });

  it('handle create stash', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);
    const createCall = 7;
    const nameField = screen.getByLabelText('Name text field');

    fireEvent.change(nameField, { target: { value: name } });
    const createStashBtn = screen.getByText('Create Stash');
    fireEvent.click(createStashBtn);

    expect(api.get).toHaveBeenNthCalledWith(
      createCall,
      `/project/?type=git&op=createstash&root=${rootDir}&name=${name}`
    );
  });

  it('handle delete stash', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);
    const deleteCall = 7;

    fireEvent.click(screen.getByText('stash{1}'));
    fireEvent.click(screen.getByText('Delete Stash'));

    // uses index to delete
    expect(api.get).toHaveBeenNthCalledWith(deleteCall, `/project/?type=git&op=deletestash&root=${rootDir}&name=0`);
  });

  it('select stash', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);
    const selectCall = 7;

    fireEvent.click(screen.getByText('stash{1}'));
    fireEvent.click(screen.getByText('Switch Stash'));

    expect(api.get).toHaveBeenNthCalledWith(
      selectCall,
      `/project/?type=git&op=selectstash&root=${rootDir}&name=stash{1}`
    );
  });

  it('handle reset', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const resetBtn = screen.getByText('Reset');
    fireEvent.click(resetBtn);

    expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=resetbranch&root=${rootDir}`);
  });
});
