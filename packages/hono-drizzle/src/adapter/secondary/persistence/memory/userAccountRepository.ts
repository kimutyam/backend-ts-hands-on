import { errAsync, okAsync } from 'neverthrow';

import type { UserAccount } from '../../../../app/domain/userAccount/userAccount.js';
import { UserAccountNotFoundError } from '../../../../app/domain/userAccount/userAccountNotFound.js';
import type { FindUserAccountById } from '../../../../app/port/secondary/persistence/userAccountRepository.js';

const createFindByIdFn =
  (aggregates: Map<string, UserAccount>): FindUserAccountById =>
  (aggregateId) => {
    const aggregate = aggregates.get(aggregateId);
    return aggregate
      ? okAsync(aggregate)
      : errAsync(UserAccountNotFoundError.create(aggregateId));
  };

const createRepository = (
  initialAggregates: Map<string, UserAccount> = new Map<string, UserAccount>(),
) => {
  const aggregates = new Map(initialAggregates);
  return {
    findById: createFindByIdFn(aggregates),
  };
};

const UserAccountRepository = {
  create: createRepository,
} as const;

export { UserAccountRepository };
