import { Hono } from 'hono';

import { CartHandler } from '../../../../../adapter/primary/shopping/web/cartHandler.js';
import type { WebInjector } from '../injector.js';

const makeApp = (webInjector: WebInjector): Hono => {
  const app = new Hono();

  app.onError((err, c) => {
    console.error(err.message);
    return c.json({ message: 'Internal Server Error' }, 500);
  });

  app.route('/carts', webInjector.injectFunction(CartHandler.create));

  return app;
};
export { makeApp };
