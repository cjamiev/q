import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, fullTestWrapper, mockStore } from 'testHelper';
import { loadPassword } from './clipboardActions';
import Clipboard from './Clipboard';

const pathname = '/clipboard';
const ZERO = 0;

const defaultProps = {};
const defaultStoreProps = {
  clipboard: {
    error: {},
    records: mockStore.clipboard.records
  }
};

const defaultStorePropsTwo = {
  ...defaultStoreProps,
  global: {
    ...mockStore.global,
    commandResponse: 'test-command-response'
  },
  clipboard: defaultStoreProps.clipboard
};

describe('Clipboard', () => {
  it('checks page renders', () => {
    reduxTestWrapper(Clipboard, defaultProps, defaultStoreProps, pathname);

    expect(screen.queryAllByText('Clipboard')[ZERO]).toBeInTheDocument();
    expect(screen.queryByText('label1')).toBeInTheDocument();
    expect(screen.queryByText('username')).toBeInTheDocument();
    expect(screen.queryByText('password')).toBeInTheDocument();
    expect(screen.queryByText('label2')).toBeInTheDocument();
    expect(screen.queryByText('username2')).toBeInTheDocument();
    expect(screen.queryByText('password2')).toBeInTheDocument();
  });

  it('checks filter', () => {
    reduxTestWrapper(Clipboard, defaultProps, defaultStoreProps, pathname);

    const input = screen.queryByLabelText('Filter by label text field');
    fireEvent.change(input, { target: { value: 'label2' } });

    expect(screen.queryByText('label1')).not.toBeInTheDocument();
    expect(screen.queryByText('label2')).toBeInTheDocument();
  });

  it('commandResponse dispatch', () => {
    document.execCommand = jest.fn();
    fullTestWrapper(Clipboard, defaultProps, defaultStorePropsTwo, pathname);

    expect(screen.queryByText(defaultStorePropsTwo.global.commandResponse)).toBeInTheDocument();
    const copyBtn = screen.getByText('Copy');
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    fireEvent.click(copyBtn);

    const copyEl = appendChildSpy.mock.calls[ZERO][ZERO];
    expect(copyEl.value).toEqual('\"test-command-response\"');
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });
});
