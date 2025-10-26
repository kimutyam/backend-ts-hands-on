import { eq } from 'drizzle-orm';
import type { Result } from 'neverthrow';
import { err, ok, ResultAsync } from 'neverthrow';

import { UserAccount } from '../../../../app/domain/userAccount/userAccount.js';
import { UserAccountNotFoundError } from '../../../../app/domain/userAccount/userAccountNotFound.js';
import type { FindUserAccountById } from '../../../../app/port/secondary/persistence/userAccountRepository.js';
import { Db } from './db.js';
import { userAccountTable } from './schema/userAccount.sql.js';

type UserAccountSelect = typeof userAccountTable.$inferSelect;

const toUserAccount =
  (aggregateId: string) =>
  (
    selects: ReadonlyArray<UserAccountSelect>,
  ): Result<UserAccount, UserAccountNotFoundError> => {
    if (selects.length === 0) {
      return err(UserAccountNotFoundError.create(aggregateId));
    }

    const { name, sequenceNumber } = selects[0]!;

    return ok(
      UserAccount.parse({
        aggregateId,
        name,
        sequenceNumber,
      }),
    );
  };

const createFindByIdFn =
  (db: Db): FindUserAccountById =>
  (id) =>
    ResultAsync.fromSafePromise(
      db.select().from(userAccountTable).where(eq(userAccountTable.id, id)),
    ).andThen(toUserAccount(id));

createFindByIdFn.inject = [Db.token] as const;

const UserAccountRepository = {
  createFindByIdFn,
} as const;

export { UserAccountRepository };
