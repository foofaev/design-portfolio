#!/usr/bin/env node

/* eslint-disable no-underscore-dangle */

import * as program from 'commander';
import * as repl from 'repl';
import * as _ from 'lodash';
import { FastifyInstance } from 'fastify';
import getServer from '../backend';
import seedFiles from '../backend/scripts/seedFiles';

process.on('unhandledRejection', (error: Error, promise: Promise<any>) => {
  if (error) {
    console.error(`Possibly Unhandled Rejection at: Promise ${promise}, reason: ${error.toString()} ${error.stack}`);
  }
});

process.on('uncaughtException', (error) => {
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

program.command('server')
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
  .command('seedFiles')
  .action(async () => {
    try {
      await seedFiles();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(-1);
    }
  });
program.parse(process.argv);
