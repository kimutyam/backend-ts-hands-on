import type { ApplicationError } from '../../util/applicationError';

const kind = 'UserAccountNotFoundError';
export type UserAccountNotFoundError = ApplicationError<typeof kind, Readonly<{ email: string }>>;
export const UserAccountNotFoundError = (email: string): UserAccountNotFoundError => ({
  kind,
  message: 'ユーザーアカウントを認証できません',
  detail: { email },
});
