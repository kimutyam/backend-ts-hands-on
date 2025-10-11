import type { UserAccount } from 'app/domain/userAccount/userAccount.js';
import type { UserAccountNotFoundError } from 'app/domain/userAccount/userAccountNotFound.js';
import type { ResultAsync } from 'neverthrow';

interface FindUserAccountById {
  (id: string): ResultAsync<UserAccount, UserAccountNotFoundError>;
}

const FindUserAccountById = {
  token: 'FindUserAccountById' as const,
} as const;

export { FindUserAccountById };
