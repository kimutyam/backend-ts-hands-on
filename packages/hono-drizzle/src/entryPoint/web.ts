import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { UserAccountApi } from '../adaptors/primary/web/userAccountApi.js';
import { WebInjector } from './injector/web.js';

const app = new Hono();
const injector = WebInjector.create();
app.route('/userAccounts', injector.resolve(UserAccountApi.token));

// TODO: 諸々のエラーハンドリング

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(
      `Server is running on http://localhost:${info.port.toString()}`,
    );
  },
);
