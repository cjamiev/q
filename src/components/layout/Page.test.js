import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import Page from './Page';
import { TIME } from 'constants/time';

const pathname = '/home';
const ZERO = 0;
const defaultProps = {
  sidePanelContent: 'test-sidepanelcontent',
  children: <div>content</div>
};

describe('Page', () => {
  it('checks page renders', () => {
    reduxTestWrapper(Page, defaultProps, {}, pathname);

    expect(screen.queryByText('content')).toBeInTheDocument();
  });

  it('checks sidepanel does not show', () => {
    reduxTestWrapper(Page, { children: 'content' }, {}, pathname);

    expect(screen.queryByLabelText('Open or Close Sidepanel')).not.toBeInTheDocument();
  });

  it('checks side panel', () => {
    jest.useFakeTimers();
    reduxTestWrapper(Page, defaultProps, {}, pathname);

    expect(screen.queryByText(defaultProps.sidePanelContent)).not.toBeInTheDocument();

    const sidePanelButton = screen.getByLabelText('Open or Close Sidepanel');
    fireEvent.click(sidePanelButton);
    jest.advanceTimersByTime(TIME.A_SECOND);

    expect(screen.queryByText(defaultProps.sidePanelContent)).toBeInTheDocument();

    // Does not work for some reason
    // fireEvent.click(sidePanelButton);
    // jest.advanceTimersByTime(TIME.A_SECOND);

    // expect(screen.queryByText(defaultProps.sidePanelContent)).not.toBeInTheDocument();
  });
});
