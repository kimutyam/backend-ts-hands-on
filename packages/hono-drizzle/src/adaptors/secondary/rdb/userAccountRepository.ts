import { eq } from 'drizzle-orm';
import { errAsync, okAsync, ResultAsync } from 'neverthrow';

import { UserAccountNotFoundError } from '../../../domain/userAccount/userAccountNotFound.js';
import type { FindUserAccountById } from '../../../ports/secondary/userAccountRepository.js';
import { Db } from './db.js';
import { userAccountTable } from './schema/userAccount.sql.js';

const buildFindById =
  (db: Db): FindUserAccountById =>
  (id: string) =>
    ResultAsync.fromSafePromise(
      db.select().from(userAccountTable).where(eq(userAccountTable.id, id)),
    ).andThen((users) => {
      const user = users[0];
      return user
        ? okAsync({ id: user.id, name: user.name })
        : errAsync(new UserAccountNotFoundError(id));
    });

buildFindById.inject = [Db.token] as const;

const UserAccountRepository = {
  buildFindById,
} as const;

export { UserAccountRepository };
