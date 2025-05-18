import { eq } from 'drizzle-orm';
import type { drizzle } from 'drizzle-orm/node-postgres';
import { errAsync, okAsync, ResultAsync } from 'neverthrow';

import { UserAccountNotFoundError } from '../../../../domain/userAccount/userAccountNotFound.js';
import type { FindUserAccountById } from '../../../../domain/userAccount/userAccountRepository.js';
import { Db } from '../db.js';
import { userAccountTable } from '../schema/userAccount.sql.js';

const buildFindUserAccountById =
  (db: ReturnType<typeof drizzle>): FindUserAccountById =>
  (id: string): ReturnType<FindUserAccountById> =>
    ResultAsync.fromSafePromise(
      db.select().from(userAccountTable).where(eq(userAccountTable.id, id)),
    ).andThen((users) => {
      const user = users[0];
      return user
        ? okAsync({ id: user.id, name: user.name })
        : errAsync(new UserAccountNotFoundError(id));
    });

buildFindUserAccountById.inject = [Db.token] as const;

export { buildFindUserAccountById };
