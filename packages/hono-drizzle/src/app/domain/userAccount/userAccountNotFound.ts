import type { ApplicationError } from '../../util/applicationError.js';

const kind = 'UserAccountNotFound';

interface UserAccountNotFoundError extends ApplicationError<typeof kind> {
  readonly userAccountId: string;
}

const create = (userAccountId: string): UserAccountNotFoundError => ({
  kind,
  message: `カートが見つかりませんでした: ${userAccountId}`,
  userAccountId,
});

const UserAccountNotFoundError = {
  kind,
  create,
} as const;

export { UserAccountNotFoundError };
