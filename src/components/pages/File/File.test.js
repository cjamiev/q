import { fireEvent, screen, waitFor } from '@testing-library/react';
import { reduxTestWrapper, mockApi, mockGet, mockPost } from 'testHelper';
import File from './File';

const apiMock = mockApi(mockGet, mockPost);

const pathname = '/file';
const ZERO = 0;
const ONE = 1;

describe('File', () => {
  describe(':String ops', () => {
    it('handle sort', () => {
      reduxTestWrapper(File, {}, {}, pathname);

      const contentField = screen.getByLabelText('Content text area');
      const sortAscBtn = screen.getByText('Sort Asc');
      const sortDescBtn = screen.getByText('Sort Desc');

      fireEvent.change(contentField, { target: { value: '1 3 2 5 4' } });

      fireEvent.click(sortAscBtn);
      expect(screen.queryByText('1 2 3 4 5')).toBeInTheDocument();

      fireEvent.click(sortDescBtn);
      expect(screen.queryByText('5 4 3 2 1')).toBeInTheDocument();
    });

    it('handle split/join', () => {
      reduxTestWrapper(File, {}, {}, pathname);

      const contentField = screen.getByLabelText('Content text area');
      const splitBtn = screen.getByText('Split');
      const joinBtn = screen.getByText('Join');
      const delimiterDropdown = screen.getByText('Delimiter space');

      fireEvent.change(contentField, { target: { value: '1 3 2 5 4' } });

      fireEvent.click(splitBtn);
      fireEvent.click(delimiterDropdown);
      fireEvent.click(screen.getByText('comma'));

      fireEvent.click(joinBtn);
      expect(screen.queryByText('1,3,2,5,4')).toBeInTheDocument();
    });

    it('handle trim', () => {
      reduxTestWrapper(File, {}, {}, pathname);

      const contentField = screen.getByLabelText('Content text area');
      const trimBtn = screen.getByText('Trim');

      fireEvent.change(contentField, { target: { value: '1    4' } });
      fireEvent.click(trimBtn);

      expect(screen.queryByText('1 4')).toBeInTheDocument();
    });
  });

  describe(':JSON ops', () => {
    it('handle validate', () => {
      reduxTestWrapper(File, {}, {}, pathname);

      const jsonOp = screen.getByText('JSON');
      fireEvent.click(jsonOp);

      const contentField = screen.getByLabelText('Content text area');
      const validateBtn = screen.getByText('Validate');

      fireEvent.change(contentField, { target: { value: '1 2 3 4 5' } });
      fireEvent.click(validateBtn);
      expect(screen.queryByText('NOT Valid')).toBeInTheDocument();

      fireEvent.change(contentField, { target: { value: '{ "test": 123 }' } });
      fireEvent.click(validateBtn);
      expect(screen.queryByText('Valid')).toBeInTheDocument();
    });

    it('handle stringify', () => {
      reduxTestWrapper(File, {}, {}, pathname);

      const jsonOp = screen.getByText('JSON');
      fireEvent.click(jsonOp);

      const contentField = screen.getByLabelText('Content text area');
      const stringifyBtn = screen.getByText('Stringify');

      fireEvent.change(contentField, { target: { value: '{ test: 123 }' } });
      fireEvent.click(stringifyBtn);

      expect(screen.queryByText('\'{ "test": 123 }\'')).toBeInTheDocument();
    });

    it('handle parse', () => {
      reduxTestWrapper(File, {}, {}, pathname);

      const jsonOp = screen.getByText('JSON');
      fireEvent.click(jsonOp);

      const contentField = screen.getByLabelText('Content text area');
      const parseBtn = screen.getByText('Parse');

      fireEvent.change(contentField, { target: { value: '\'{ "test": 123 }\'' } });
      fireEvent.click(parseBtn);

      expect(screen.queryByText('{ "test": 123 }')).toBeInTheDocument();
    });

    it('handle objectify', () => {
      reduxTestWrapper(File, {}, {}, pathname);

      const jsonOp = screen.getByText('JSON');
      fireEvent.click(jsonOp);

      const contentField = screen.getByLabelText('Content text area');
      const objectifyBtn = screen.getByText('Object');

      fireEvent.change(contentField, { target: { value: '\'{ "test": 123 }\'' } });
      fireEvent.click(objectifyBtn);

      expect(screen.queryByText('{ test: 123 }')).toBeInTheDocument();
    });
  });

  describe(':Regex ops', () => {
    it('handle find and replace', () => {
      reduxTestWrapper(File, {}, {}, pathname);

      const regexOp = screen.getByText('Regex');
      fireEvent.click(regexOp);

      const contentField = screen.getByLabelText('Content text area');
      const findField = screen.getByLabelText('Search text field');
      const replaceField = screen.getByLabelText('Replace text field');
      const convertBtn = screen.getByText('Convert');
      const globalBtn = screen.getByText('Global');

      fireEvent.change(contentField, { target: { value: '1 2 1 2 1' } });
      fireEvent.change(findField, { target: { value: '1' } });
      fireEvent.change(replaceField, { target: { value: '3' } });

      fireEvent.click(convertBtn);
      expect(screen.queryByText('3 2 1 2 1')).toBeInTheDocument();

      fireEvent.click(globalBtn);
      fireEvent.click(convertBtn);
      expect(screen.queryByText('3 2 3 2 3')).toBeInTheDocument();
    });

    it('handle regex with substring', () => {
      reduxTestWrapper(File, {}, {}, pathname);

      const regexOp = screen.getByText('Regex');
      fireEvent.click(regexOp);

      const contentField = screen.getByLabelText('Content text area');
      const findField = screen.getByLabelText('Search text field');
      const startField = screen.getByLabelText('Substring number range start');
      const endField = screen.getByLabelText('Substring number range end');
      const convertBtn = screen.getByText('Convert');
      const globalBtn = screen.getByText('Global');
      const copyBtn = screen.getByText('Copy RegEx');

      fireEvent.change(contentField, { target: { value: '1.1231 M 2.12 5.12312' } });
      fireEvent.change(findField, { target: { value: '[.][0-9]{2,}' } });
      fireEvent.change(startField, { target: { value: '0' } });
      fireEvent.change(endField, { target: { value: '3' } });

      fireEvent.click(globalBtn);
      fireEvent.click(convertBtn);
      expect(screen.queryByText('1.12 M 2.12 5.12')).toBeInTheDocument();

      document.execCommand = jest.fn();
      const appendChildSpy = jest.spyOn(document.body, 'appendChild');
      fireEvent.click(copyBtn);
      const copyEl = appendChildSpy.mock.calls[ZERO][ZERO];

      expect(copyEl.value).toEqual('/[.][0-9]{2,}/g');
      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });

    it('handle invalid regex', () => {
      reduxTestWrapper(File, {}, {}, pathname);

      const regexOp = screen.getByText('Regex');
      fireEvent.click(regexOp);

      const contentField = screen.getByLabelText('Content text area');
      const findField = screen.getByLabelText('Search text field');
      const replaceField = screen.getByLabelText('Replace text field');
      const convertBtn = screen.getByText('Convert');

      fireEvent.change(contentField, { target: { value: '1 2 1 2 1' } });
      fireEvent.change(findField, { target: { value: '[' } });
      fireEvent.change(replaceField, { target: { value: '3' } });

      fireEvent.click(convertBtn);
      expect(screen.queryByText('Not valid regex expression')).toBeInTheDocument();
      expect(screen.queryByText('1 2 1 2 1')).toBeInTheDocument();
    });
  });

  it('handle copy', () => {
    document.execCommand = jest.fn();
    reduxTestWrapper(File, {}, {}, pathname);

    const contentField = screen.getByLabelText('Content text area');

    fireEvent.change(contentField, { target: { value: '1 2 3 4 5' } });

    const copyBtn = screen.getByLabelText('Copy File');

    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    fireEvent.click(copyBtn);
    const copyEl = appendChildSpy.mock.calls[ONE][ZERO];

    expect(copyEl.value).toEqual('1 2 3 4 5');
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('handle save', () => {
    reduxTestWrapper(File, {}, {}, pathname);

    const nameField = screen.getByPlaceholderText('Enter File Name');
    const contentField = screen.getByLabelText('Content text area');
    const saveBtn = screen.getByLabelText('Save');

    fireEvent.change(nameField, { target: { value: 'test2.txt' } });
    fireEvent.change(contentField, { target: { value: '1 2 3 4 5' } });
    fireEvent.click(saveBtn);

    expect(apiMock.post).toHaveBeenCalledWith('/file', { filename: 'test2.txt', content: '1 2 3 4 5' });
  });

  it('handle loading existing file', async () => {
    reduxTestWrapper(File, {}, {}, pathname);

    await waitFor(() => {
      expect(screen.queryByText('fileOne')).toBeInTheDocument();
    });
    const testBtn = screen.getByText('fileOne');
    fireEvent.click(testBtn);

    await waitFor(() => {
      expect(screen.queryByText('fileOne contents')).toBeInTheDocument();
    });

    const nameField = screen.getByPlaceholderText('Enter File Name');

    fireEvent.change(nameField, { target: { value: 'fileOne' } });
    await waitFor(() => {
      expect(screen.queryByText('fileOne contents')).toBeInTheDocument();
    });
  });
});
