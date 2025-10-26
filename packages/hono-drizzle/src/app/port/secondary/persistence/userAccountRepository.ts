import type { UserAccount } from '../../../domain/userAccount/userAccount.js';
import type { UserAccountNotFoundError } from '../../../domain/userAccount/userAccountNotFound.js';
import type { FindById } from './repository.js';

type FindUserAccountById = FindById<UserAccount, UserAccountNotFoundError>;

const FindUserAccountById = {
  token: 'FindUserAccountById' as const,
} as const;

export { FindUserAccountById };
