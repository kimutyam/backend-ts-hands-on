import assert from 'node:assert';

import { describe } from 'vitest';

import { userAccountTable } from '../schema/userAccount.sql.js';
import { UserAccountRepository } from '../userAccountRepository.js';
import { truncateTables } from './helper/table.js';
import { testDb } from './helper/db.js';

describe('buildFindUserAccountById', () => {
  const findUserAccountById = UserAccountRepository.findById(testDb);

  beforeAll(async () => {
    await truncateTables(testDb);
    await testDb.insert(userAccountTable).values({
      id: 'test-id',
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
    expect(result.value).toEqual({ id: 'test-id', name: 'Test User' });
  });

  it('ユーザーアカウントが存在しない場合', async () => {
    const userAccountId = 'non-existent-id';
    const result = await findUserAccountById(userAccountId);

    assert(result.isErr());
    expect(result.error.userAccountId).toBe(userAccountId);
  });
});
