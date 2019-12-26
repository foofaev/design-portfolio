import * as React from 'react';
import {
  Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'
import { createBrowserHistory } from 'history';
import { setConfig, hot } from 'react-hot-loader';

import Index from './components/LangingPage';

const history = createBrowserHistory();

setConfig({ logLevel: 'debug' });

const App = () => (
  <HelmetProvider>
    <Router history={history}>
      <Switch>
        <Route path="/" component={Index} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </HelmetProvider>
);

export default hot(module)(App);
