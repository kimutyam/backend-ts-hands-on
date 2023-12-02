export class UserAccountNotFoundError extends Error {
  constructor(public readonly email: string) {
    super('ユーザーアカウントを認証できません');
    this.name = 'UserAccountNotFoundError';
  }
}
