import { UseCaseInjector } from '../../../useCase/injector.js';
import { UserAccountApi } from './userAccountApi.js';

const create = () =>
  UseCaseInjector.create().provideFactory(
    UserAccountApi.token,
    UserAccountApi.build,
  );

type WebInjector = ReturnType<typeof create>;
const WebInjector = {
  create,
} as const;

export { WebInjector };
