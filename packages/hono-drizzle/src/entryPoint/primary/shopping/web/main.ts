import * as R from 'remeda';

import { ValidatedEnv } from '../../validatedEnv.js';
import { ShoppingPortInjector } from '../injector.js';
import { App } from './app.js';
import { bootServer, createShutdownServerFn } from './server.js';

const env = ValidatedEnv.parse(process.env);
const [rootInjector, shoppingPortInjector] = ShoppingPortInjector.create(env);
const server = R.pipe(App.create(shoppingPortInjector), bootServer);
const shutdownServer = createShutdownServerFn();

const startShutdown = (context: { reason: string; code?: number }): void => {
  shutdownServer(server, rootInjector, context).catch((error: unknown) => {
    console.error('Unexpected error during shutdown:', error);
  });
};

process.on('SIGINT', () => {
  startShutdown({ reason: 'SIGINT' });
});

process.on('SIGTERM', () => {
  startShutdown({ reason: 'SIGTERM' });
});

// NOTE: app.onErrorではリクエスト時以外で検出できないため、最終防衛策として設置
process.on('uncaughtException', (error) => {
  console.error('致命的なエラー（uncaughtException）が発生しました:');
  console.error(error.stack);
  startShutdown({
    reason: 'uncaughtException',
    code: 1,
  });
});

// NOTE: Promiseチェーン内でキャッチされなかったエラーを検出
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  startShutdown({
    reason: 'unhandledRejection',
    code: 1,
  });
});
