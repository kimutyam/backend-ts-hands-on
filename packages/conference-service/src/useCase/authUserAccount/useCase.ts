import type { UserAccountNotFoundError } from '../../domain/userAccount';
import type { Authed } from '../../domain/userAccount/authed';
import type { AuthError } from '../../domain/userAccount/authError';
import type { Result } from '../../util/result';
import type { UseCase } from '../useCase';

export type Input = Readonly<{
  email: string;
  password: string;
}>;

type UseCaseError = UserAccountNotFoundError | AuthError;

export type Output = Result<UseCaseError, Readonly<Authed>>;

export type AuthUserAccountUseCase = UseCase<Input, Output>;
