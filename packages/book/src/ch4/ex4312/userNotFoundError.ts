import type { ApplicationError } from 'ch4/common/applicationError.js';

const kind = 'UserNotFound';

type UserNotFoundError = ApplicationError<typeof kind>;

const create = (): UserNotFoundError => ({
  kind,
  message: 'エラーが発生しました',
});

const UserNotFoundError = {
  kind,
  create,
} as const;

export { UserNotFoundError };
