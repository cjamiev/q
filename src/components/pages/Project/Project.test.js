import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { reduxTestWrapper, mockApi, mockGet, mockPost } from 'testHelper';
import Project from './Project';
import api from 'api';
import { TIME } from 'constants/time';

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
const incorrectDirData = 'The system cannot find the path specified.';
const apiMock = mockApi(mockGet, mockPost);

const rootDir = './';
const defaultStoreProps = {
  project: {
    directories: [
      { label: 'dir1', value: '/dir1' },
      { label: 'dir2', value: '/dir2' }
    ],
    regexes: [],
    remoteUrl: 'test-url',
    branches: [],
    stashes: [],
    packageJson: {},
    versions: {},
    message: ''
  }
};

describe('Project', () => {
  it('updating root dir', async () => {
    const CALL_NUM = 10;
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const sidePanelBtn = screen.getByLabelText('Open or Close Sidepanel');
    fireEvent.click(sidePanelBtn);
    fireEvent.click(screen.getByText('dir1'));

    expect(apiMock.get.mock.calls[CALL_NUM]).toEqual(['/project/?type=package&op=read&root=/dir1']);
  });
});
