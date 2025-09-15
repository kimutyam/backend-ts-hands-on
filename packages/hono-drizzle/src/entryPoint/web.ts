import type { ServerType } from '@hono/node-server';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import type { Injector } from 'typed-inject';

import { UserAccountHandler } from '../adapter/primary/web/userAccountHandler.js';
import { WebInjector } from './injector/web.js';

const makeApp = (webInjector: WebInjector): Hono => {
  const app = new Hono();

  app.onError((err, c) => {
    console.error(err.message);
    return c.json({ message: 'Internal Server Error' }, 500);
  });

  app.route('/userAccounts', webInjector.resolve(UserAccountHandler.token));

  return app;
};

const makeHttpServer = (app: Hono): ServerType =>
  serve(
    {
      fetch: app.fetch,
      port: 3000,
    },
    (info) => {
      console.log(`Server is running on ${info.port.toString()}`);
    },
  ).on('close', () => {
    console.log('HTTP server closed.');
  });

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
  });
  await injector.dispose();
};

const [rootInjector, webInjector] = WebInjector.build();
const app = makeApp(webInjector);
const server = makeHttpServer(app);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGINT', () => shutdown(server, rootInjector, 'SIGINT'));
// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGTERM', () => shutdown(server, rootInjector, 'SIGTERM'));
