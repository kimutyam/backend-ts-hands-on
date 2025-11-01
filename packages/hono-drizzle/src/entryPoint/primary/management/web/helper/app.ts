import { Hono } from 'hono';

import { UserAccountHandler } from '../../../../../adapter/primary/management/web/userAccountHandler.js';
import type { WebInjector } from '../injector.js';

const makeApp = (webInjector: WebInjector): Hono => {
  const app = new Hono();

  app.onError((err, c) => {
    console.error(err.message);
    return c.json({ message: 'Internal Server Error' }, 500);
  });

  app.route(
    '/userAccounts',
    webInjector.injectFunction(UserAccountHandler.create),
  );

  return app;
};
export { makeApp };
