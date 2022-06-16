import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Tabs from './Tabs';

const Component = () => {
  return <div>component1</div>;
};

const ComponentTwo = () => {
  return <div>component2</div>;
};

const ZERO = 0;
const defaultProps = {
  handleError: jest.fn(),
  data: [
    { title: 'item1', component: Component },
    { title: 'item2', component: ComponentTwo }
  ]
};

describe('Tabs', () => {
  it('checks tab behavior', () => {
    simpleTestWrapper(Tabs, defaultProps);

    expect(screen.queryByText('component1')).toBeInTheDocument();
    expect(screen.queryByText('component2')).not.toBeInTheDocument();

    const tab2 = screen.getByText('item2');
    fireEvent.click(tab2);

    expect(screen.queryByText('component2')).toBeInTheDocument();
    expect(screen.queryByText('component1')).not.toBeInTheDocument();
  });
});
