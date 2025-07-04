import assert from 'node:assert';

import { describe } from 'vitest';

import { Aggregate } from '../../../../../domain/aggregate.js';
import { CartNotFoundError } from '../../../../../domain/cart/cartNotFoundError.js';
import { Quantity } from '../../../../../domain/cart/quantity.js';
import { CustomerId } from '../../../../../domain/customer/customerId.js';
import { Price } from '../../../../../domain/product/price.js';
import { ProductId } from '../../../../../domain/product/productId.js';
import { truncateTables } from '../../__tests__/helper/table.js';
import { Db } from '../../db.js';
import { PgPool } from '../../pgPool.js';
import { buildFindCartById } from '../findCartById.js';
import { buildSetup } from './helper/cart.js';

describe('FindCartById', () => {
  const pool = PgPool.build();
  const db = Db.build(pool);
  const findCartById = buildFindCartById(db);

  const customerId1 = CustomerId.generate();
  const customerId2 = CustomerId.generate();
  const customerId3 = CustomerId.generate();
  const productId1 = ProductId.generate();
  const productId2 = ProductId.generate();

  beforeAll(async () => {
    await truncateTables(db);
    const setup = buildSetup(db);
    await setup(productId1, productId2, customerId1, customerId2, customerId3);
  });

  afterAll(async () => {
    await truncateTables(db);
    await pool.end();
  });

  it('登録済みのカートで索引できる', async () => {
    const result = await findCartById(customerId1);
    assert(result.isOk());
    expect(result.value).toStrictEqual({
      aggregateId: customerId1,
      sequenceNumber: Aggregate.InitialSequenceNumber,
      cartItems: [
        {
          productId: productId1,
          price: Price.parse(1_000),
          quantity: Quantity.parse(2),
        },
      ],
    });
  });

  it('カートアイテムが空の場合でも索引できる', async () => {
    const result = await findCartById(customerId2);
    assert(result.isOk());
    expect(result.value).toStrictEqual({
      aggregateId: customerId2,
      sequenceNumber: 5,
      cartItems: [],
    });
  });
  it('カートが存在しない場合はエラーとなる', async () => {
    const result = await findCartById(customerId3);
    assert(result.isErr());
    expect(result.error).toBeInstanceOf(CartNotFoundError);
    expect(result.error.customerId).toBe(customerId3);
  });
});
