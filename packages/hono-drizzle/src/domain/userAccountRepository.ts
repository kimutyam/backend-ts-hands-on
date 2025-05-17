import type { UserAccount } from 'domain/userAccount.js';
import type { UserAccountNotFoundError } from 'domain/userAccountNotFound.js';
import type { ResultAsync } from 'neverthrow';

interface FindUserAccount {
  (id: string): ResultAsync<UserAccount, UserAccountNotFoundError>;
}

const FindUserAccount = {
  token: 'FindUserAccount' as const,
} as const;

export { FindUserAccount };
