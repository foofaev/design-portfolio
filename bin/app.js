#!/usr/bin/env node

/* eslint-disable */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const program = require('commander');
const repl = require('repl');
// const getContainer = require('../backend/container').default;
const getServer = require('../backend').default;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
process.on('unhandledRejection', (error, promise) => {
    console.error(`Possibly Unhandled Rejection at: Promise ${promise}, reason: ${error.toString()} ${error.stack}`);
});

process.on('uncaughtException', (error) => {
    console.error(`Exception: ${error.toString()} ${error.stack}`);
    setTimeout(() => process.exit(-1), 200);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
program
    .command('repl')
    .action(async () => {
        const replServer = repl.start({
            prompt: 'Application console > ',
        });
        const container = getServer();
        Object.keys(container.repositories).forEach((key) => {
            replServer.context[key] = container.repositories[key];
        });
        replServer.context.__ = require('lodash');
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
program.command('server')
    .action(async () => {
        try {
            const server = await getServer();
            await server.db.synchronize();
            await server.listen(process.env.PORT || 4000);
        } catch (error) {
            console.error(error);
            process.exit(-1);
        }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
program.parse(process.argv);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // {
        //   name: 'imageId', type: 'UUID', onUpdate: 'SET NULL', isNullable: true,
        // },
