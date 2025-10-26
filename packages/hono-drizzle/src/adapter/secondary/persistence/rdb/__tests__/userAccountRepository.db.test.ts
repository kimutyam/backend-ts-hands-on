import assert from 'node:assert';

import { describe } from 'vitest';

import { Aggregate } from '../../../../../app/domain/aggregate.js';
import { userAccountTable } from '../schema/userAccount.sql.js';
import { UserAccountRepository } from '../userAccountRepository.js';
import { testDb } from './helper/db.js';
import { truncateTables } from './helper/table.js';

describe.sequential('buildFindUserAccountById', () => {
  const findUserAccountById = UserAccountRepository.createFindByIdFn(testDb);

  beforeEach(async () => {
    await truncateTables(testDb);
    await testDb.insert(userAccountTable).values({
      id: 'test-id',
      sequenceNumber: Aggregate.InitialSequenceNumber,
      name: 'Test User',
    });
  });

  afterAll(async () => {
    await truncateTables(testDb);
    await testDb.$client.end();
  });

  it('登録済みのユーザーアカウントで索引できる', async () => {
    const result = await findUserAccountById('test-id');
    assert(result.isOk());
    expect(result.value).toEqual({
      aggregateId: 'test-id',
      sequenceNumber: 1,
      name: 'Test User',
    });
  });

  it('ユーザーアカウントが存在しない場合', async () => {
    const userAccountId = 'non-existent-id';
    const result = await findUserAccountById(userAccountId);

    assert(result.isErr());
    expect(result.error.userAccountId).toBe(userAccountId);
  });
});
