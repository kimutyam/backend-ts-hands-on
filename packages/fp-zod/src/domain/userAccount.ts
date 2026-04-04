import type { Age } from '#/domain/age.js';
import { UserAccountId } from '#/domain/userAccountId.js';
import type { UserAccountName } from '#/domain/userAccountName.js';

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
