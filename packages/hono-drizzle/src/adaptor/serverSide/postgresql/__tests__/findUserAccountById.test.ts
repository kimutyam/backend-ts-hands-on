import assert from 'node:assert';

import { drizzle } from 'drizzle-orm/node-postgres';

import { buildFindUserAccountById } from '../findUserAccountById.js';
import { PgPool } from '../pgPool.js';
import { userAccountTable } from '../schema/userAccount.sql.js';
import { truncateTables } from './helpers.js';

describe('buildFindUserAccountById', () => {
  const pool = PgPool.build();
  const db = drizzle(pool);
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

  test('登録済みのユーザーアカウントで索引できる', async () => {
    const result = await findUserAccountById('test-id');
    assert(result.isOk());
    expect(result.value).toEqual({ id: 'test-id', name: 'Test User' });
  });

  test('ユーザーアカウントが存在しない場合', async () => {
    const userAccountId = 'non-existent-id';
    const result = await findUserAccountById(userAccountId);

    assert(result.isErr());
    expect(result.error.userAccountId).toBe(userAccountId);
  });
});
