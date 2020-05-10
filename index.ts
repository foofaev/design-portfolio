/* eslint-disable no-underscore-dangle */

import * as program from 'commander';
import * as repl from 'repl';
import * as _ from 'lodash';
import { FastifyInstance } from 'fastify';
import getServer from './backend';
import seedProjects from './backend/scripts/seedProjects';

process
  .on('unhandledRejection', (reason, promise) => {
    if (reason) {
      console.error(`Possibly Unhandled Rejection at: Promise ${promise}, reason: ${JSON.stringify(reason)}`);
    }
  });

process
  .on('uncaughtException', (error) => {
    console.error(`Exception: ${error.toString()} ${error.stack}`);
    setTimeout(() => process.exit(-1), 200);
  });

program
  .command('repl')
  .action(async () => {
    const replServer = repl.start({
      prompt: 'Application console > ',
    });
    const server: FastifyInstance = await getServer();
    await server.db.synchronize();
    replServer.context.fastify = { ...server };
    replServer.context._ = _;
  });

program
  .command('server')
  .action(async () => {
    try {
      const server = await getServer();
      const port = +(process.env.PORT || 0);
      await server.listen(port || 4000);
    } catch (error) {
      console.error(error);
      process.exit(-1);
    }
  });

program
  .command('seedProjects')
  .action(async () => {
    try {
      await seedProjects();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(-1);
    }
  });

program.parse(process.argv);
