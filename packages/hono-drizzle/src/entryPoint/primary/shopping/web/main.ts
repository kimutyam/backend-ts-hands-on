import * as R from 'remeda';

import { ValidatedEnv } from '../../validatedEnv.js';
import { ShoppingPortInjector } from '../injector.js';
import { App } from './app.js';
import { createShutdownStarter, serveApp } from './server.js';

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
  console.error('uncaughtException', error.stack);
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
