import * as R from 'remeda';

import { ShoppingPortInjector } from '#/entryPoint/primary/shopping/injector.js';
import { App } from '#/entryPoint/primary/shopping/web/app.js';
import {
  createShutdownHandler,
  serveApp,
} from '#/entryPoint/primary/shopping/web/server.js';
import { ValidatedEnv } from '#/entryPoint/primary/validatedEnv.js';

const env = ValidatedEnv.parse(process.env);
const [rootInjector, shoppingPortInjector] = ShoppingPortInjector.create(env);
const server = R.pipe(App.create(shoppingPortInjector), serveApp);
const shutdownHandler = createShutdownHandler({
  server,
  injector: rootInjector,
});

process.on('SIGINT', () => {
  shutdownHandler({ reason: 'SIGINT', code: 0 });
});

process.on('SIGTERM', () => {
  shutdownHandler({ reason: 'SIGTERM', code: 0 });
});

// NOTE: app.onErrorではリクエスト時以外で検出できないため、最終防衛策として設置
process.on('uncaughtException', (error) => {
  console.error('uncaughtException', error);
  shutdownHandler({
    reason: 'uncaughtException',
    code: 1,
  });
});

// NOTE: Promiseチェーン内でキャッチされなかったエラーを検出
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  shutdownHandler({
    reason: 'unhandledRejection',
    code: 1,
  });
});
