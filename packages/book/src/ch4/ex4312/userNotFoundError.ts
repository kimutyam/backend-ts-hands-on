import type { ApplicationError } from '../common/applicationError.js';

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
