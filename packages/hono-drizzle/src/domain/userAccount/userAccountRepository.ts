import type { UserAccount } from 'domain/userAccount/userAccount.js';
import type { UserAccountNotFoundError } from 'domain/userAccount/userAccountNotFound.js';
import type { ResultAsync } from 'neverthrow';

interface FindUserAccount {
  (id: string): ResultAsync<UserAccount, UserAccountNotFoundError>;
}

const FindUserAccount = {
  token: 'FindUserAccount' as const,
} as const;

export { FindUserAccount };
