import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import PortfolioPage from './views/PortfolioPage';
import ProjectPage from './views/ProjectPage';
import LoginPage from './views/LoginPage';
// const LoginPage = React.lazy(() => import('./components/LoginPage/LoginPage'));
// const Portfolio = React.lazy(() => import('./components/Portfolio/Portfolio'));
// const ProjectPage = React.lazy(() => import('./components/Project/ProjectPage'));
// const ErrorPage = React.lazy(() => import('./components/ErrorPage/ErrorPage'));

const App = () => (
  <Switch>
    <Route path="/projects/:urlKey">
      <ProjectPage />
    </Route>
    <Route path="/login">
      <LoginPage />
    </Route>
    <Route path="/">
      <PortfolioPage />
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
