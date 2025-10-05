import type { ApplicationError } from 'ch4/common/applicationError.js';

const kind = 'Something';

type SomethingError = ApplicationError<typeof kind>;

const create = (message: string): SomethingError => ({
  kind,
  message,
});

const SomethingError = {
  kind,
  create,
} as const;

export { SomethingError };
