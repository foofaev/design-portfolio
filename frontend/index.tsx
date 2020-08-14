import 'typeface-roboto';
import 'typeface-roboto-slab';
import 'typeface-roboto-slab-cyrillic';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { HelmetProvider } from 'react-helmet-async';
import { HashRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import thunk from 'redux-thunk';
import reducers from './reducers';

import Root from './Root';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

const theme = createMuiTheme();

ReactDOM.render(
  <HelmetProvider>
    <HashRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Root />
        </ThemeProvider>
      </Provider>
    </HashRouter>
  </HelmetProvider>,
  document.getElementById('root'),
);
