import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'store';
import AppRouter from 'components/router';
import Global from 'components/molecules/Global';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Global />
        <AppRouter />
      </HashRouter>
    </Provider>
  );
}

export default App;
