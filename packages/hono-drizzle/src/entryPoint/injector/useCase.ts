import { GetUserAccount } from '../../app/port/primary/getUserAccount.js';
import { buildGetUserAccount } from '../../app/useCase/getUserAccount.js';
import type { SecondaryPortInjector } from './secondaryPort.js';

const create = (injector: SecondaryPortInjector) =>
  injector.provideFactory(GetUserAccount.token, buildGetUserAccount);

type UseCaseInjector = ReturnType<typeof create>;
const UseCaseInjector = {
  create,
} as const;

export { UseCaseInjector };
