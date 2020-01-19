import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { setConfig, hot } from 'react-hot-loader';

import ProfilePage from './components/ProfilePage/ProfilePage';

setConfig({ logLevel: 'debug' });

const App = () => (
  <Switch>
    <Route path="/" component={ProfilePage} />
    <Redirect to="/" />
  </Switch>
);

export default hot(module)(App);
