import type { UserAccount } from './userAccount';

export interface UserAccountResolver {
  resolveByEmail(email: string): Promise<UserAccount | undefined>;
}
