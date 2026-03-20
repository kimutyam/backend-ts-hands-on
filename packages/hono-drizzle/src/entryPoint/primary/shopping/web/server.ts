import type { ServerType } from '@hono/node-server';
import { serve } from '@hono/node-server';
import * as R from 'remeda';
import type { Injector } from 'typed-inject';

import { App } from '../../../../adapter/primary/shopping/web/app.js';
import { ValidatedEnv } from '../../validatedEnv.js';
import { ShoppingPortInjector } from '../injector.js';
import { setupRoute } from './app.js';

const bootServer = (app: App): ServerType =>
  serve(
    {
      fetch: app.fetch,
      port: 3000,
    },
    (info) => {
      console.log(`Server is running on ${info.port.toString()}`);
    },
  );

const shutdownServer = async (
  server: ServerType,
  injector: Injector,
  reason: string,
  code = 0,
) => {
  console.log(`[${reason}] shutting down...`);
  server.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('HTTP server closed.');
  });
  await injector.dispose();
  process.exit(code);
};

const env = ValidatedEnv.parse(process.env);
const [rootInjector, shoppingPortInjector] = ShoppingPortInjector.create(env);

const server = R.pipe(
  App.create(),
  setupRoute(shoppingPortInjector),
  bootServer,
);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGINT', () => shutdownServer(server, rootInjector, 'SIGINT'));
// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGTERM', () => shutdownServer(server, rootInjector, 'SIGTERM'));

// NOTE: app.onErrorではリクエスト時以外で検出できないため、最終防衛策として設置
// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('uncaughtException', async (error) => {
  console.error('致命的なエラー（uncaughtException）が発生しました:');
  console.error(error.stack);
  await shutdownServer(server, rootInjector, 'uncaughtException', 1);
});

// NOTE: Promiseチェーン内でキャッチされなかったエラーを検出
// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('unhandledRejection', async (reason) => {
  console.error('Unhandled Rejection:', reason);
  await shutdownServer(server, rootInjector, 'unhandledRejection', 1);
});
