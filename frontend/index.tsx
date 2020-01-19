import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { HelmetProvider } from 'react-helmet-async';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import thunk from 'redux-thunk';
import reducers from './reducers';

import Root from './Root';

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

ReactDOM.render(
  <HelmetProvider>
    <CookiesProvider>
      <BrowserRouter>
        <Provider store={store}>
          <CssBaseline />
          <Root />
        </Provider>
      </BrowserRouter>
    </CookiesProvider>
  </HelmetProvider>,
  document.getElementById('root'),
);
