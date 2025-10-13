import { eq } from 'drizzle-orm';
import { errAsync, okAsync, ResultAsync } from 'neverthrow';

import { UserAccountNotFoundError } from '../../../../app/domain/userAccount/userAccountNotFound.js';
import type { FindUserAccountById } from '../../../../app/port/secondary/persistence/userAccountRepository.js';
import { Db } from './db.js';
import { userAccountTable } from './schema/userAccount.sql.js';

const createFindByIdFn =
  (db: Db): FindUserAccountById =>
  (id) =>
    ResultAsync.fromSafePromise(
      db.select().from(userAccountTable).where(eq(userAccountTable.id, id)),
    ).andThen((users) => {
      const user = users[0];
      return user
        ? okAsync({ id: user.id, name: user.name })
        : errAsync(UserAccountNotFoundError.create(id));
    });

createFindByIdFn.inject = [Db.token] as const;

const UserAccountRepository = {
  createFindByIdFn,
} as const;

export { UserAccountRepository };
