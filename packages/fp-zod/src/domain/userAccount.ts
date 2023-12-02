import type { Age } from './age';
import { UserAccountId } from './userAccountId';
import type { UserAccountName } from './userAccountName';

type UserAccount = Readonly<{
  id: UserAccountId;
  name: UserAccountName;
  age: Age;
}>;

const UserAccount = {
  create: ({ name, age }: Omit<UserAccount, 'id'>): UserAccount => ({
    id: UserAccountId.generate(),
    name,
    age,
  }),
} as const;

export { UserAccount };
