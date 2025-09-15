import { UserAccountHandler } from '../../adapter/primary/web/userAccountHandler.js';
import type { UseCaseInjector } from './useCase.js';

const create = (useCaseInjector: UseCaseInjector) =>
  useCaseInjector.provideFactory(
    UserAccountHandler.token,
    UserAccountHandler.build,
  );

type WebInjector = ReturnType<typeof create>;
const WebInjector = {
  create,
} as const;

export { WebInjector };
