import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { setConfig, hot } from 'react-hot-loader';

import Portfolio from './components/Portfolio/Portfolio';

setConfig({ logLevel: 'debug' });

const App = () => (
  <Switch>
    <Route path="/" component={Portfolio} />
    <Redirect to="/" />
  </Switch>
);

export default hot(module)(App);
