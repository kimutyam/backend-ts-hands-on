import { handle } from 'hono/aws-lambda';
import { App } from 'sample/adaptor/userSide/web/app.js';
import { GetUserAccount } from 'sample/useCase/getUserAccount.js';

export const build = (getUserAccount: GetUserAccount, app: App) => {
  app.get('/users/:id', async (c) => {
    const user = await getUserAccount(c.req.param('id'));
    return user ? c.json(user) : c.json({ message: 'Not Found' }, 404);
  });

  return handle(app);
};

build.inject = [GetUserAccount.token, App.token] as const;

const UserAccountApi = {
  token: 'UserAccountApi' as const,
  build,
} as const;

export { UserAccountApi };
