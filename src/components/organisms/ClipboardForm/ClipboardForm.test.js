import api from 'api';
import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, mockStore, mockDate } from 'testHelper';
import ClipboardForm from './ClipboardForm';

jest.mock('api');
const mockPost = jest.fn();
mockPost.mockResolvedValue({
  data: {
    data: {
      message: 'successful'
    }
  }
});
api.post = mockPost;
document.execCommand = jest.fn();
const defaultStoreProps = {
  global: mockStore.global
};
const pathname = '/home';
const ZERO = 0;
const ONE = 1;
const TWO = 2;
const existingRecords = {
  keyOne: [
    {
      title: 'test-title',
      data: [
        [
          { type: 'copy', label: 'copy1', value: 'value1' },
          { type: 'copy', label: 'copy2', value: 'value2' },
          { type: 'copy', label: 'copy3', value: 'value3' }
        ],
        [
          { type: 'copy', label: 'copy4', value: 'value4' },
          { type: 'copy', label: 'copy5', value: 'value5' }
        ]
      ]
    }
  ],
  keyTwo: [{ title: 'test-title2', data: [[{ type: 'copy', label: 'copy21', value: 'value21' }]] }]
};

describe('ClipboardForm', () => {
  mockDate();

  it('handle save new data', () => {
    reduxTestWrapper(ClipboardForm, { records: {} }, defaultStoreProps);
    fireEvent.change(screen.queryByLabelText('Key text field'), { target: { value: 'key-testname' } });
    fireEvent.change(screen.queryByLabelText('Title text field'), { target: { value: 'title-testname' } });

    fireEvent.change(screen.queryByLabelText('Name text field'), { target: { value: 'copy-testname' } });
    fireEvent.change(screen.queryByLabelText('Value text field'), { target: { value: 'copy-testvalue' } });
    fireEvent.click(screen.getByText('Save'));
    fireEvent.click(screen.getByText('Add'));

    fireEvent.click(screen.getByText('Type copy'));
    fireEvent.click(screen.getByText('command'));
    fireEvent.change(screen.queryByLabelText('Name text field'), { target: { value: 'command-testname' } });
    fireEvent.click(screen.getByText('Commands'));
    fireEvent.click(screen.getByText('commandOne'));
    fireEvent.click(screen.getByText('Save'));
    fireEvent.click(screen.getByText('Add'));

    fireEvent.click(screen.getByText('Type command'));
    fireEvent.click(screen.getByText('link'));
    fireEvent.change(screen.queryByLabelText('Name text field'), { target: { value: 'link-testname' } });
    fireEvent.change(screen.queryByLabelText('Value text field'), { target: { value: 'link-testvalue' } });
    fireEvent.click(screen.getByText('Save'));
    fireEvent.click(screen.getByText('Add'));

    fireEvent.click(screen.getByText('Type link'));
    fireEvent.click(screen.getByText('text'));
    fireEvent.change(screen.queryByLabelText('Name text field'), { target: { value: 'text-testname' } });
    fireEvent.change(screen.queryByLabelText('Value text field'), { target: { value: 'text-testvalue' } });
    fireEvent.click(screen.getByText('Save'));
    fireEvent.click(screen.getByText('Add'));

    fireEvent.click(screen.getByText('Type text'));
    fireEvent.click(screen.getByText('timer'));
    fireEvent.change(screen.queryByLabelText('Name text field'), { target: { value: 'timer-testname' } });
    fireEvent.click(screen.getAllByText('Submit')[ZERO]);
    fireEvent.click(screen.getByText('Add'));

    fireEvent.click(screen.getAllByText('Submit')[ONE]);
    const newRecords = {
      'key-testname': [
        {
          title: 'title-testname',
          data: [
            [{ label: 'copy-testname', value: 'copy-testvalue', type: 'copy' }],
            [{ label: 'command-testname', value: { showArgs: false, name: 'commandOne' }, type: 'command' }],
            [{ label: 'link-testname', value: 'link-testvalue', type: 'link' }],
            [{ label: 'text-testname', value: 'text-testvalue', type: 'text' }],
            [
              {
                label: 'timer-testname',
                value: 'Fri Jan 01 2021 05:00:00 GMT-0600 (Central Standard Time)',
                type: 'timer'
              }
            ]
          ]
        }
      ]
    };

    expect(api.post).toHaveBeenCalledWith('/db', {
      filename: 'clipboard.json',
      content: JSON.stringify(newRecords)
    });
  });

  it('handle edit existing data', () => {
    reduxTestWrapper(ClipboardForm, { records: existingRecords });
    fireEvent.click(screen.getByText('Existing Key'));
    fireEvent.click(screen.getByText('keyOne'));
    fireEvent.click(screen.getByText('Existing Title'));
    fireEvent.click(screen.getByText('test-title'));

    fireEvent.click(screen.getByText('copy1'));

    fireEvent.click(screen.getAllByLabelText('Move Up')[TWO]);
    fireEvent.click(screen.getAllByLabelText('Move Down')[ZERO]);
    fireEvent.click(screen.getAllByLabelText('Delete')[ZERO]);
    fireEvent.click(screen.getByText('Update'));

    expect(screen.queryByText('copy1')).toBeInTheDocument();
    expect(screen.queryByText('copy2')).toBeInTheDocument();
    expect(screen.queryByText('copy3')).not.toBeInTheDocument();
    expect(screen.queryByText('copy4')).toBeInTheDocument();

    fireEvent.click(screen.getByText('copy4'));
    fireEvent.click(screen.getByText('Remove'));
    expect(screen.queryByText('copy4')).not.toBeInTheDocument();
    expect(screen.queryByText('copy5')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Submit'));
    const updatedRecords = {
      keyOne: [
        {
          title: 'test-title',
          data: [
            [
              { type: 'copy', label: 'copy1', value: 'value1' },
              { type: 'copy', label: 'copy2', value: 'value2' }
            ]
          ]
        }
      ],
      keyTwo: [{ title: 'test-title2', data: [[{ type: 'copy', label: 'copy21', value: 'value21' }]] }]
    };
    expect(api.post).toHaveBeenCalledWith('/db', {
      filename: 'clipboard.json',
      content: JSON.stringify(updatedRecords)
    });
  });

  it('handle delete existing data', () => {
    reduxTestWrapper(ClipboardForm, { records: existingRecords });
    fireEvent.click(screen.getByText('Existing Key'));
    fireEvent.click(screen.getByText('keyOne'));
    fireEvent.click(screen.getByText('Existing Title'));
    fireEvent.click(screen.getByText('test-title'));

    fireEvent.click(screen.getByText('Delete'));
    expect(api.post).toHaveBeenCalledWith('/db', {
      filename: 'clipboard.json',
      content: JSON.stringify({
        ...existingRecords,
        keyOne: []
      })
    });
  });
});
