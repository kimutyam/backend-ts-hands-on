import { UserAccountApi } from '../../adapter/primary/web/userAccountApi.js';
import { UseCaseInjector } from './useCase.js';

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
