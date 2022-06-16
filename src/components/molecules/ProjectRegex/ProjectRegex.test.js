import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, mockApi } from 'testHelper';
import Project from 'components/pages/Project';
import api from 'api';

const directories = ['./', 'C:/doc'];
const regexOne = {
  description: 'reduce svg icon numbers to three decimals',
  fileProjectRegex: 'Icon.js$',
  lineProjectRegex: '[.][0-9]{2,}',
  modifiers: 'g',
  lineRange: {
    start: 0,
    end: 3
  },
  replace: 'test'
};

const projectDb = {
  directories,
  regexes: [regexOne]
};

const mockGet = (url) => {
  if (url === '/db/?name=project.json') {
    return Promise.resolve({
      data: {
        data: JSON.stringify(projectDb)
      }
    });
  } else {
    return Promise.resolve({
      data: {
        message: 'test message'
      }
    });
  }
};
const mockPost = () => {
  return Promise.resolve({});
};
const apiMock = mockApi(mockGet, mockPost);

const rootDir = './';
const defaultStoreProps = {
  project: {
    directories,
    regexes: [regexOne],
    remoteUrl: 'test-url',
    branches: [],
    stashes: [],
    packageJson: {},
    versions: {},
    message: ''
  }
};

// act warnings
describe('Regex', () => {
  it('Run updated on files with regex', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const packageTab = screen.getByText('Regex');
    fireEvent.click(packageTab);

    const fileProjectRegexField = screen.getByLabelText('File ProjectRegex text field');
    const lineProjectRegexField = screen.getByLabelText('Line ProjectRegex text field');
    const replaceField = screen.getByLabelText('Replace text field');
    const substringStartField = screen.getByLabelText('Substring number range start');
    const substringEndField = screen.getByLabelText('Substring number range end');
    const globalModifierOption = screen.getByText('Global');
    const submitBtn = screen.getByText('Submit');

    fireEvent.change(fileProjectRegexField, { target: { value: regexOne.fileProjectRegex } });
    fireEvent.change(lineProjectRegexField, { target: { value: regexOne.lineProjectRegex } });
    fireEvent.change(replaceField, { target: { value: '123' } });
    fireEvent.change(substringStartField, { target: { value: '0' } });
    fireEvent.change(substringEndField, { target: { value: '3' } });
    fireEvent.click(globalModifierOption);
    fireEvent.click(submitBtn);

    expect(api.post).toHaveBeenCalledWith(
      `/project/?type=regex&root=${rootDir}`,
      JSON.stringify({
        fileProjectRegex: regexOne.fileProjectRegex,
        lineProjectRegex: regexOne.lineProjectRegex,
        modifiers: regexOne.modifiers,
        lineRange: {
          start: '0',
          end: '3'
        },
        replace: '123'
      })
    );
  });

  it('Select existing ProjectRegex', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const packageTab = screen.getByText('Regex');
    fireEvent.click(packageTab);

    fireEvent.click(screen.getByText('ProjectRegexes'));
    fireEvent.click(screen.getByText(regexOne.description));

    expect(screen.getByDisplayValue(regexOne.fileProjectRegex)).toBeInTheDocument();
    expect(screen.getByDisplayValue(regexOne.lineProjectRegex)).toBeInTheDocument();
    expect(screen.getByDisplayValue(regexOne.lineRange.start)).toBeInTheDocument();
    expect(screen.getByDisplayValue(regexOne.lineRange.end)).toBeInTheDocument();
    expect(screen.getByLabelText('Global checkbox option is selected')).toBeInTheDocument();
    expect(screen.getByDisplayValue(regexOne.replace)).toBeInTheDocument();
  });

  it('Delete existing ProjectRegex', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const packageTab = screen.getByText('Regex');
    fireEvent.click(packageTab);

    const descriptionField = screen.getByLabelText('Description text field');

    fireEvent.change(descriptionField, { target: { value: regexOne.description } });
    fireEvent.click(screen.getByText('Delete'));

    expect(api.post).toHaveBeenCalledWith('/db', {
      filename: 'project.json',
      content: JSON.stringify({ directories, regexes: [] })
    });
  });

  it('Save regex', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const packageTab = screen.getByText('Regex');
    fireEvent.click(packageTab);

    const descriptionField = screen.getByLabelText('Description text field');
    const fileProjectRegexField = screen.getByLabelText('File ProjectRegex text field');
    const lineProjectRegexField = screen.getByLabelText('Line ProjectRegex text field');
    const replaceField = screen.getByLabelText('Replace text field');
    const substringStartField = screen.getByLabelText('Substring number range start');
    const substringEndField = screen.getByLabelText('Substring number range end');
    const globalModifierOption = screen.getByText('Global');
    const saveBtn = screen.getByText('Save');

    fireEvent.change(descriptionField, { target: { value: regexOne.description } });
    fireEvent.change(fileProjectRegexField, { target: { value: regexOne.fileProjectRegex } });
    fireEvent.change(lineProjectRegexField, { target: { value: regexOne.lineProjectRegex } });
    fireEvent.change(replaceField, { target: { value: '123' } });
    fireEvent.change(substringStartField, { target: { value: '0' } });
    fireEvent.change(substringEndField, { target: { value: '3' } });
    fireEvent.click(globalModifierOption);
    fireEvent.click(saveBtn);

    expect(api.post).toHaveBeenCalledWith('/db', {
      filename: 'project.json',
      content: JSON.stringify({
        directories,
        regexes: [
          {
            description: regexOne.description,
            fileProjectRegex: regexOne.fileProjectRegex,
            lineProjectRegex: regexOne.lineProjectRegex,
            modifiers: 'g',
            lineRange: {
              start: '0',
              end: '3'
            },
            replace: '123'
          }
        ]
      })
    });
  });
});
