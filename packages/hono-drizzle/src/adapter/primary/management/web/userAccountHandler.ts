import { Hono } from 'hono';

import { GetUserAccount } from '../../../../app/port/primary/management/getUserAccount.js';

const handlerName = 'UserAccountHandler';

// Note: `/userAccounts` 階層に複数のメソッドを設ける想定
const create = (getUserAccount: GetUserAccount) => {
  const app = new Hono();
  app.get('/:id', async (c) => {
    const user = await getUserAccount(c.req.param('id'));
    return user ? c.json(user) : c.json({ message: 'Not Found' }, 404);
  });
  return app;
};

create.inject = [GetUserAccount.token] as const;

const UserAccountHandler = {
  token: handlerName,
  build: create,
} as const;

export { UserAccountHandler };
