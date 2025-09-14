import { Hono } from 'hono';

import { GetUserAccount } from '../../../app/port/primary/getUserAccount.js';

// Note: `/userAccounts` 階層に複数のメソッドを設ける想定
const build = (getUserAccount: GetUserAccount) => {
  const app = new Hono();
  app.get('/:id', async (c) => {
    const user = await getUserAccount(c.req.param('id'));
    return user ? c.json(user) : c.json({ message: 'Not Found' }, 404);
  });
  return app;
};

build.inject = [GetUserAccount.token] as const;

const UserAccountController = {
  token: 'UserAccountController' as const,
  build,
} as const;

export { UserAccountController };
