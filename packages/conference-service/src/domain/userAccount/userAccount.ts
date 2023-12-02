import * as bcrypt from 'bcrypt';
import type { ApplicationError } from '../../util/applicationError';
import type { WithAggregateId } from '../../util/resolver';
import type { Result } from '../../util/result';
import { Failure, Success } from '../../util/result';
import { Authed } from './authed';
import type { UserAccountId } from './userAccountId';

export type UserAccount = WithAggregateId<UserAccountId> &
  Readonly<{
    email: string;
    hashedPassword: string;
  }>;

const aggregateType = 'UserAccount';

const AuthErrorKind = 'AuthError';
export type AuthError = ApplicationError<
  typeof AuthErrorKind,
  Readonly<{
    id: UserAccountId;
    email: string;
  }>
>;
export const AuthError = (userAccount: UserAccount): AuthError => ({
  kind: AuthErrorKind,
  message: '認証に失敗しました。',
  detail: { id: userAccount.aggregateId, email: userAccount.email },
});

const auth =
  (password: string) =>
  (userAccount: UserAccount): Result<AuthError, Authed> =>
    bcrypt.compareSync(password, userAccount.hashedPassword)
      ? Success(Authed.build(userAccount.aggregateId))
      : Failure(AuthError(userAccount));

export const UserAccount = {
  auth,
  aggregateType,
};
