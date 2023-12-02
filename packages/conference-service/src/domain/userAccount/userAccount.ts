import * as bcrypt from 'bcrypt';
import type { WithAggregateId } from '../../util/resolver';
import type { Result } from '../../util/result';
import { Failure, Success } from '../../util/result';
import { Authed } from './authed';
import { AuthError } from './authError';
import type { UserAccountId } from './userAccountId';

export type UserAccount = WithAggregateId<UserAccountId> &
  Readonly<{
    email: string;
    hashedPassword: string;
  }>;

const aggregateType = 'UserAccount';

const auth =
  (password: string) =>
  ({ aggregateId, email, hashedPassword }: UserAccount): Result<AuthError, Authed> =>
    bcrypt.compareSync(password, hashedPassword)
      ? Success(Authed.build(aggregateId))
      : Failure(new AuthError(aggregateId, email));

export const UserAccount = {
  auth,
  aggregateType,
};
