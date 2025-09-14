import { UserAccountController } from '../../adapter/primary/web/userAccountController.js';
import { UseCaseInjector } from './useCase.js';

const create = () =>
  UseCaseInjector.create().provideFactory(
    UserAccountController.token,
    UserAccountController.build,
  );

type WebInjector = ReturnType<typeof create>;
const WebInjector = {
  create,
} as const;

export { WebInjector };
