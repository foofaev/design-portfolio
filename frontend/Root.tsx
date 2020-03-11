import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Portfolio from './views/Portfolio/Portfolio';
import ProjectPage from './views/Project/ProjectPage';
// const Portfolio = React.lazy(() => import('./components/Portfolio/Portfolio'));
// const ProjectPage = React.lazy(() => import('./components/Project/ProjectPage'));
// const ErrorPage = React.lazy(() => import('./components/ErrorPage/ErrorPage'));
// const LoginPage = React.lazy(() => import('./components/LoginPage/LoginPage'));

const App = () => (
  <Switch>
    <Route path="/projects/:urlKey">
      <ProjectPage />
    </Route>
    <Route path="/">
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
