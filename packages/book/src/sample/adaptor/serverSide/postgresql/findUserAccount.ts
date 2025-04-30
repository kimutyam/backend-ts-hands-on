import { eq } from 'drizzle-orm';
import type { drizzle } from 'drizzle-orm/node-postgres';
import { errAsync, okAsync, ResultAsync } from 'neverthrow';
import { Db } from 'sample/adaptor/serverSide/postgresql/db.js';
import { usersTable } from 'sample/adaptor/serverSide/postgresql/schema.js';
import { UserAccountNotFoundError } from 'sample/domain/userAccountNotFound.js';
import type { FindUserAccount } from 'sample/domain/userAccountRepository.js';

const buildFindUserAccount =
  (db: ReturnType<typeof drizzle>): FindUserAccount =>
  (id: string): ReturnType<FindUserAccount> =>
    ResultAsync.fromSafePromise(
      db.select().from(usersTable).where(eq(usersTable.id, id)),
    ).andThen((users) =>
      users[0] ? okAsync(users[0]) : errAsync(new UserAccountNotFoundError(id)),
    );

buildFindUserAccount.inject = [Db.token] as const;

export { buildFindUserAccount };
