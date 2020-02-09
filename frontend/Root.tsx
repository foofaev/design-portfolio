import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { setConfig, hot } from 'react-hot-loader';

const Portfolio = React.lazy(() => import('./components/Portfolio/Portfolio'));
const ProjectPage = React.lazy(() => import('./components/Project/ProjectPage'));
// const ErrorPage = React.lazy(() => import('./components/ErrorPage/ErrorPage'));
// const LoginPage = React.lazy(() => import('./components/LoginPage/LoginPage'));

setConfig({ logLevel: 'debug' });

const App = () => (
  <Switch>
    <Route path="/projects/:projectUrlKey">
      <ProjectPage />
    </Route>
    <Route exact path="/">
      <Portfolio />
    </Route>
  </Switch>
);

// const App = () => (
//   <Switch>
//     <Route path="/projects/:projectUrlKey">
//       <ProjectPage />
//     </Route>
//     <Route path="/login">
//       <LoginPage />
//     </Route>
//     <Route exact path="/">
//       <Portfolio />
//     </Route>
//     <Route path="*">
//       <ErrorPage />
//     </Route>
//   </Switch>
// );

export default hot(module)(App);
