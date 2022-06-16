import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, fullTestWrapper } from 'testHelper';
import Alert from './Alert';
import { ROUTES } from 'constants/routes';

const ZERO = 0;
const data = {
  id: 1,
  content: 'test-content',
  status: 'error'
};
const data2 = {
  id: 2,
  content: 'test-content2',
  status: 'success'
};
const alertStoreProps = {
  alert: {
    queue: [data]
  }
};
const alertStoreProps2 = {
  alert: {
    queue: [data, data2]
  }
};

const TestComponent = () => {
  return <span>dummy</span>;
};

describe('Alert', () => {
  it('check alert renders', () => {
    reduxTestWrapper(Alert, {}, alertStoreProps2);

    expect(screen.queryByText(data.content)).toBeInTheDocument();
    expect(screen.queryByText(data2.content)).toBeInTheDocument();
  });

  it('handle dismiss', () => {
    reduxTestWrapper(Alert, {}, alertStoreProps);

    expect(screen.queryByText(data.content)).toBeInTheDocument();
    fireEvent.click(screen.getByText('X'));

    expect(screen.queryByText(data.content)).not.toBeInTheDocument();
  });

  it('should not be rendered', () => {
    reduxTestWrapper(Alert);

    expect(screen.queryByText(data.content)).not.toBeInTheDocument();
  });

  it('should render on scroll', () => {
    const { wrapper } = fullTestWrapper(TestComponent, {}, alertStoreProps, ROUTES.HOME.url, true);
    const scrollContainer = wrapper.container.querySelector('.page');

    Object.defineProperty(global.window, 'pageYOffset', { value: 100 });
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(screen.queryByText(data.content)).toBeInTheDocument();

    Object.defineProperty(global.window, 'pageYOffset', { value: 151 });
    fireEvent.scroll(window, { target: { scrollY: 151 } });
    expect(screen.queryByText(data.content)).toBeInTheDocument();
  });
});
