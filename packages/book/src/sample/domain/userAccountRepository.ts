import type { ResultAsync } from 'neverthrow';
import type { UserAccount } from 'sample/domain/userAccount.js';
import type { UserAccountNotFoundError } from 'sample/domain/userAccountNotFound.js';

interface FindUserAccount {
  (id: string): ResultAsync<UserAccount, UserAccountNotFoundError>;
}

const FindUserAccount = {
  token: 'FindUserAccount' as const,
} as const;

export { FindUserAccount };
