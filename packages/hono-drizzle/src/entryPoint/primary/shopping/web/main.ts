import * as R from 'remeda';

import { ShoppingPortInjector } from '#/entryPoint/primary/shopping/injector.js';
import { App } from '#/entryPoint/primary/shopping/web/app.js';
import {
  createShutdownStarter,
  serveApp,
} from '#/entryPoint/primary/shopping/web/server.js';
import { ValidatedEnv } from '#/entryPoint/primary/validatedEnv.js';

const env = ValidatedEnv.parse(process.env);
const [rootInjector, shoppingPortInjector] = ShoppingPortInjector.create(env);
const server = R.pipe(App.create(shoppingPortInjector), serveApp);
const shutdownServer = createShutdownStarter(server, rootInjector);

process.on('SIGINT', () => {
  shutdownServer({ reason: 'SIGINT' });
});

process.on('SIGTERM', () => {
  shutdownServer({ reason: 'SIGTERM' });
});

// NOTE: app.onErrorではリクエスト時以外で検出できないため、最終防衛策として設置
process.on('uncaughtException', (error) => {
  console.error('uncaughtException', error);
  shutdownServer({
    reason: 'uncaughtException',
    code: 1,
  });
});

// NOTE: Promiseチェーン内でキャッチされなかったエラーを検出
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  shutdownServer({
    reason: 'unhandledRejection',
    code: 1,
  });
});
