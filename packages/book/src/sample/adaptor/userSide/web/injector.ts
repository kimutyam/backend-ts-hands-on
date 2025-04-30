import { App } from 'sample/adaptor/userSide/web/app.js';
import { UserAccountApi } from 'sample/adaptor/userSide/web/userAccountApi.js';
import { UseCaseInjector } from 'sample/useCase/injector.js';

const create = () =>
  UseCaseInjector.create()
    .provideFactory(App.token, App.build)
    .provideFactory(UserAccountApi.token, UserAccountApi.build);

type WebInjector = ReturnType<typeof create>;
const WebInjector = {
  create,
} as const;

export { WebInjector };
