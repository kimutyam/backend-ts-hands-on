import { Hono } from 'hono';

import { GetUserAccount } from '../../../useCase/getUserAccount.js';

export const build = (getUserAccount: GetUserAccount) => {
  const app = new Hono();
  app.get('/:id', async (c) => {
    const user = await getUserAccount(c.req.param('id'));
    return user ? c.json(user) : c.json({ message: 'Not Found' }, 404);
  });
  return app;
};

build.inject = [GetUserAccount.token] as const;

const UserAccountApi = {
  token: 'UserAccountApi' as const,
  build,
} as const;

export { UserAccountApi };
