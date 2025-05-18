import assert from 'node:assert';

import { describe } from 'vitest';

import { Aggregate } from '../../../../../domain/aggregate.js';
import { CartNotFoundError } from '../../../../../domain/cart/cartNotFoundError.js';
import { Quantity } from '../../../../../domain/cart/quantity.js';
import { CustomerId } from '../../../../../domain/customer/customerId.js';
import { Price } from '../../../../../domain/product/price.js';
import { ProductId } from '../../../../../domain/product/productId.js';
import { truncateTables } from '../../__tests__/helpers.js';
import { Db } from '../../db.js';
import { PgPool } from '../../pgPool.js';
import { cartTable } from '../../schema/cart.sql.js';
import { cartItemTable } from '../../schema/cartItem.sql.js';
import { customerTable } from '../../schema/customer.sql.js';
import { productTable } from '../../schema/product.sql.js';
import { buildFindCartById } from '../findCartById.js';

describe.sequential('FindCartById', () => {
  const pool = PgPool.build();
  const db = Db.build(pool);
  const findCartById = buildFindCartById(db);

  const customerId1 = CustomerId.generate();
  const customerId2 = CustomerId.generate();
  const customerId3 = CustomerId.generate();

  const productId1 = ProductId.generate();

  beforeAll(async () => {
    await truncateTables(db);
    await db.insert(productTable).values({
      productId: productId1,
      sequenceNumber: Aggregate.InitialSequenceNumber,
      name: 'Product1',
      price: Price.parse(1_000),
    });
    await db.insert(customerTable).values([
      {
        customerId: customerId1,
        name: 'Customer1',
      },
      {
        customerId: customerId2,
        name: 'Customer2',
      },
      {
        customerId: customerId3,
        name: 'Customer2',
      },
    ]);
    await db.insert(cartTable).values([
      {
        customerId: customerId1,
        sequenceNumber: Aggregate.InitialSequenceNumber,
      },
      {
        customerId: customerId2,
        sequenceNumber: 5,
      },
    ]);
    await db.insert(cartItemTable).values({
      customerId: customerId1,
      productId: productId1,
      price: Price.parse(1_000),
      quantity: Quantity.parse(2),
    });
  });

  afterAll(async () => {
    await truncateTables(db);
    await pool.end();
  });

  test('登録済みのカートで索引できる', async () => {
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

  test('カートアイテムが空の場合でも索引できる', async () => {
    const result = await findCartById(customerId2);
    assert(result.isOk());
    expect(result.value).toStrictEqual({
      aggregateId: customerId2,
      sequenceNumber: 5,
      cartItems: [],
    });
  });
  test('カートが存在しない場合はエラーとなる', async () => {
    const result = await findCartById(customerId3);
    assert(result.isErr());
    expect(result.error).toBeInstanceOf(CartNotFoundError);
    expect(result.error.customerId).toBe(customerId3);
  });
});
