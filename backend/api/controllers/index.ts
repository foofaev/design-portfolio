import * as _ from 'lodash';

import * as projectRoutes from './projects';
import * as fileRoutes from './files';
import * as sessionRoutes from './sessions';
import * as usersRoutes from './users';

const routes = [
  ..._.values(projectRoutes),
  ..._.values(fileRoutes),
  ..._.values(sessionRoutes),
  ..._.values(usersRoutes),
];

export default routes;
