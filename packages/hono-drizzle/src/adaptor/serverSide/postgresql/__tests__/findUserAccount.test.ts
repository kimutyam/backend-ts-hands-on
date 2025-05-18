import assert from 'node:assert';

import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';

import { buildFindUserAccount } from '../findUserAccount.js';
import { PgPool } from '../pgPool.js';
import { userAccountTable } from '../schema/userAccount.sql.js';

describe('buildFindUserAccount', () => {
  const pool = PgPool.build();
  const db = drizzle(pool);

  beforeAll(async () => {
    await db.insert(userAccountTable).values({
      id: 'test-id',
      name: 'Test User',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  afterAll(async () => {
    await db.delete(userAccountTable).where(eq(userAccountTable.id, 'test-id'));
    await pool.end();
  });

  it('登録済みのユーザーアカウントで索引できる', async () => {
    const findUserAccount = buildFindUserAccount(db);
    const result = await findUserAccount('test-id');

    assert(result.isOk());
    expect(result.value).toEqual({ id: 'test-id', name: 'Test User' });
  });

  it('ユーザーアカウントが存在しない場合', async () => {
    const userAccountId = 'non-existent-id';
    const findUserAccount = buildFindUserAccount(db);
    const result = await findUserAccount(userAccountId);

    assert(result.isErr());
    expect(result.error.userAccountId).toBe(userAccountId);
  });
});
