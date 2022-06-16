import React from 'react';
import { screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Card from './Card';

const defaultProps = {
  title: <div>title</div>,
  body: <div>body</div>,
  footer: <div>footer</div>
};

describe('Card', () => {
  it('checks behavior', () => {
    simpleTestWrapper(Card, defaultProps);

    expect(screen.queryByText('title')).toBeInTheDocument();
    expect(screen.queryByText('body')).toBeInTheDocument();
    expect(screen.queryByText('footer')).toBeInTheDocument();
  });
});
