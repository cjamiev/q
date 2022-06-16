import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import Modal from 'components/atoms/Modal/Modal';
import api from 'api';

const ZERO = 0;

jest.mock('api');
api.post.mockResolvedValue({
  data: {
    message: 'test message'
  }
});

const mockAction = (payload) => {
  return (dispatch) => {
    api
      .post('url', payload)
      .then((response) => {
        dispatch({ type: 'MOCK_ACTION', data: response.data.message });
      })
      .catch((error) => {
        dispatch({ type: 'MOCK_ERROR_ACTION', error: error.message });
      });
  };
};

const baseProps = {
  title: 'test-title',
  message: 'test-message',
  children: null,
  editable: true,
  dispatchAction: { label: 'dispatchAction', action: mockAction, parse: (x) => x },
  beforeClose: jest.fn(),
  close: jest.fn(),
  buttonList: [
    {
      label: 'one',
      action: jest.fn()
    }
  ]
};

describe('Modal', () => {
  it('default', () => {
    reduxTestWrapper(Modal, baseProps);

    expect(screen.queryByText(baseProps.title)).toBeInTheDocument();
    expect(screen.queryByText(baseProps.message)).toBeInTheDocument();
  });

  it('handle close', () => {
    reduxTestWrapper(Modal, baseProps);

    fireEvent.click(screen.getByLabelText('Close Modal'));

    expect(baseProps.beforeClose).toHaveBeenCalled();
    expect(baseProps.close).toHaveBeenCalled();
  });

  it('handle button action', () => {
    reduxTestWrapper(Modal, baseProps);

    fireEvent.click(screen.getByText(baseProps.buttonList[ZERO].label));

    expect(baseProps.buttonList[ZERO].action).toHaveBeenCalled();
  });

  it('handle dispatch action', () => {
    reduxTestWrapper(Modal, baseProps);

    fireEvent.click(screen.getByText(baseProps.dispatchAction.label));

    expect(api.post).toHaveBeenCalledWith('url', baseProps.message);
  });

  it('handle dispatch action after text change', () => {
    reduxTestWrapper(Modal, baseProps);
    const input = screen.queryByLabelText('Modal text area');
    const expectedResult = { id: 1, selected: '123', error: false };

    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(screen.getByText(baseProps.dispatchAction.label));

    expect(api.post).toHaveBeenCalledWith('url', '123');
  });
});
