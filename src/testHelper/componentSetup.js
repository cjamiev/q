/* eslint-disable max-params */
import React from 'react';
import { render } from '@testing-library/react';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Page from 'components/layout';
import { rootReducer } from 'store';
import Global from 'components/molecules/Global';
import { alertInitialState } from 'components/layout/Alert/alertReducer';
import { clipboardInitialState } from 'components/pages/Clipboard/clipboardReducer';
import { settingsInitialState } from 'components/pages/Settings/settingsReducer';
import { fileInitialState } from 'components/pages/File/fileReducer';
import { homeInitialState } from 'components/pages/Home/homeReducer';
import { projectInitialState } from 'components/pages/Project/projectReducer';
import { globalInitialState } from 'components/molecules/Global/globalReducer';
import { ROUTES } from 'constants/routes';

const middlewares = [thunk];
const appliedMiddlewares = applyMiddleware(...middlewares);

const defaultStore = {
  alert: alertInitialState,
  clipboard: clipboardInitialState,
  settings: settingsInitialState,
  file: fileInitialState,
  home: homeInitialState,
  global: globalInitialState,
  project: projectInitialState
};

const simpleTestWrapper = (Component, props = {}) => {
  return render(<Component {...props} />);
};

const reduxTestWrapper = (Component, props = {}, reduxProps = {}, locationPathname = ROUTES.HOME.url) => {
  const store = createStore(rootReducer, { ...defaultStore, ...reduxProps }, compose(appliedMiddlewares));

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[locationPathname]}>
        <Component {...props} />
      </MemoryRouter>
    </Provider>
  );
};

const fullTestWrapper = (
  Component,
  props = {},
  reduxProps = {},
  locationPathname = ROUTES.HOME.url,
  shouldRenderPage = false
) => {
  const store = createStore(rootReducer, { ...defaultStore, ...reduxProps }, compose(appliedMiddlewares));

  const renderComponent = shouldRenderPage ? (
    <Page>
      <Component {...props} />
    </Page>
  ) : (
    <Component {...props} />
  );

  const wrapper = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[locationPathname]}>
        <Global />
        {renderComponent}
      </MemoryRouter>
    </Provider>
  );

  return { wrapper, history };
};

export { simpleTestWrapper, reduxTestWrapper, fullTestWrapper };
