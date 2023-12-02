import type { UserAccountId } from './userAccountId';

export class AuthError extends Error {
  constructor(
    public readonly id: UserAccountId,
    public readonly email: string,
  ) {
    super('認証に失敗しました');
    this.name = 'AuthError';
  }
}
