import type { ServerType } from '@hono/node-server';
import { serve } from '@hono/node-server';
import type { OpenAPIHono } from '@hono/zod-openapi';
import type { Injector } from 'typed-inject';

import { ValidatedEnv } from '../../validatedEnv.js';
import { makeApp } from './app.js';
import { WebAdapterInjector } from './injector.js';

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
const [rootInjector, webAdapterInjector] = WebAdapterInjector.create(env);
const app = makeApp(webAdapterInjector);
const server = run(app);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGINT', () => shutdown(server, rootInjector, 'SIGINT'));
// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGTERM', () => shutdown(server, rootInjector, 'SIGTERM'));

// NOTE: app.onErrorではリクエスト時以外で検出できないため、最終防衛策として設置
// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('uncaughtException', async (error) => {
  console.error('致命的なエラー（uncaughtException）が発生しました:');
  console.error(error.stack);
  await shutdown(server, rootInjector, 'uncaughtException', 1);
});

// NOTE: Promiseチェーン内でキャッチされなかったエラーを検出
// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('unhandledRejection', async (reason) => {
  console.error('Unhandled Rejection:', reason);
  await shutdown(server, rootInjector, 'unhandledRejection', 1);
});
