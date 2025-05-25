import assert from 'node:assert';

import { describe } from 'vitest';

import { truncateTables } from '../../__tests__/helpers.js';
import { Db } from '../../db.js';
import { PgPool } from '../../pgPool.js';
import { userAccountTable } from '../../schema/userAccount.sql.js';
import { buildFindUserAccountById } from '../findUserAccountById.js';

describe('buildFindUserAccountById', () => {
  const pool = PgPool.build();
  const db = Db.build(pool);
  const findUserAccountById = buildFindUserAccountById(db);

  beforeAll(async () => {
    await truncateTables(db);
    await db.insert(userAccountTable).values({
      id: 'test-id',
      name: 'Test User',
    });
  });

  afterAll(async () => {
    await truncateTables(db);
    await pool.end();
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
