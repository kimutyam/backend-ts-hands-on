import type { ServerType } from '@hono/node-server';
import { serve } from '@hono/node-server';
import type { OpenAPIHono } from '@hono/zod-openapi';
import type { Injector } from 'typed-inject';

import { AppEnv } from '../../env.js';
import { makeApp } from './app.js';
import { WebInjector } from './injector.js';

const run = (app: OpenAPIHono): ServerType =>
  serve(
    {
      fetch: app.fetch,
      port: 3000,
    },
    (info) => {
      console.log(`Server is running on ${info.port.toString()}`);
    },
  );

const shutdown = async (
  server: ServerType,
  injector: Injector,
  sig: string,
) => {
  console.log(`[${sig}] shutting down...`);
  server.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('HTTP server closed.');
  });
  await injector.dispose();
};

const appEnv = AppEnv.parse(process.env);
const [rootInjector, webInjector] = WebInjector.create(appEnv);
const app = makeApp(webInjector);
const server = run(app);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGINT', () => shutdown(server, rootInjector, 'SIGINT'));
// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGTERM', () => shutdown(server, rootInjector, 'SIGTERM'));
