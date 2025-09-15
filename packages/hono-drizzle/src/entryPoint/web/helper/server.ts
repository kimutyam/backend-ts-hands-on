import type { ServerType } from '@hono/node-server';
import { serve } from '@hono/node-server';
import type { Hono } from 'hono';
import type { Injector } from 'typed-inject';

const run = (app: Hono): ServerType =>
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

const Server = {
  run,
  shutdown,
} as const;

export { Server };
