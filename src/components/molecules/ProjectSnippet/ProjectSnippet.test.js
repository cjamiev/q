import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, mockApi, mockGet, mockPost, mockStore } from 'testHelper';
import Project from 'components/pages/Project';
import api from 'api';

const apiMock = mockApi(mockGet, mockPost);

const ZERO = 0;
const ONE = 1;
const rootDir = './';
const defaultStoreProps = {
  project: mockStore.project
};

// act warnings
describe('Snippet', () => {
  it('Load snippet file', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const snippetTab = screen.getByText('Snippet');
    fireEvent.click(snippetTab);

    const loadSnippetBtn = screen.getByText('snippetOne');
    fireEvent.click(loadSnippetBtn);

    const lastCallIndex = api.get.mock.calls.length - ONE;
    expect(api.get.mock.calls[lastCallIndex]).toEqual(['/project/?type=snippet&op=read&name=snippetOne']);
  });

  it('Create new snippet file', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const snippetTab = screen.getByText('Snippet');
    fireEvent.click(snippetTab);

    const snippetNameField = screen.getByLabelText('Snippet Name text field');
    const snippetTextField = screen.getByLabelText('Enter Content');
    const submitBtn = screen.getByText('Submit');

    fireEvent.change(snippetNameField, { target: { value: 'TestOne' } });
    fireEvent.change(snippetTextField, { target: { value: 'TestOne Contents' } });
    fireEvent.click(submitBtn);

    expect(api.post).toHaveBeenCalledWith(
      '/project/?type=snippet&op=write&name=TestOne',
      JSON.stringify('TestOne Contents')
    );
  });
});
