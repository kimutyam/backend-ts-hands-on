import type { ApplicationError } from 'ch3/ex3231/applicationError.js';

const kind = 'Something';

type SomethingError = ApplicationError<typeof kind>;

const create = (): SomethingError => ({
  kind,
  message: 'エラーが発生しました',
});

const SomethingError = {
  kind,
  create,
} as const;

export { SomethingError };
