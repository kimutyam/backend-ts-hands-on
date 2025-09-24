import { errAsync, okAsync } from 'neverthrow';

import type { UserAccount } from '../../../../app/domain/userAccount/userAccount.js';
import { UserAccountNotFoundError } from '../../../../app/domain/userAccount/userAccountNotFound.js';
import type { FindUserAccountById } from '../../../../app/port/secondary/db/userAccountRepository.js';

const buildFindById =
  (aggregates: Map<string, UserAccount>): FindUserAccountById =>
  (aggregateId) => {
    const aggregate = aggregates.get(aggregateId);
    return aggregate
      ? okAsync(aggregate)
      : errAsync(new UserAccountNotFoundError(aggregateId));
  };

const buildRepository = (
  initialAggregates: Map<string, UserAccount> = new Map<string, UserAccount>(),
) => {
  const aggregates = new Map(initialAggregates);
  return {
    findById: buildFindById(aggregates),
  };
};

const UserAccountRepository = {
  build: buildRepository,
} as const;

export { UserAccountRepository };
