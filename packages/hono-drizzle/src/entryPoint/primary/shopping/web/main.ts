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

const env = ValidatedEnv.parse(process.env);
const [rootInjector, webAdapterInjector] = WebAdapterInjector.create(env);
const app = makeApp(webAdapterInjector);
const server = run(app);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGINT', () => shutdown(server, rootInjector, 'SIGINT'));
// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGTERM', () => shutdown(server, rootInjector, 'SIGTERM'));

// https://gemini.google.com/app/c878181161e01f0e?hl=ja
process.on('unhandledRejection', (reason) => {
  // Sentry等への通知例
  // Sentry.captureException(reason);

  console.error('Unhandled Rejection:', reason);

  // 安全にプロセスを終了
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('致命的なエラー（uncaughtException）が発生しました:');
  console.error(error.stack);

  // 1. 外部サービス（Sentry等）にエラーを報告
  // 2. ログのフラッシュ（書き出し）

  // 重要：プロセスを終了させる
  process.exit(1);
});
