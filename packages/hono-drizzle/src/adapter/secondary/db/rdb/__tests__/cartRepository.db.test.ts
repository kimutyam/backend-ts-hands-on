import assert from 'node:assert';

import { describe } from 'vitest';

import { Aggregate } from '../../../../../app/domain/aggregate.js';
import { CartNotFoundError } from '../../../../../app/domain/cart/cartNotFoundError.js';
import { Quantity } from '../../../../../app/domain/cart/quantity.js';
import { CustomerId } from '../../../../../app/domain/customer/customerId.js';
import { Price } from '../../../../../app/domain/product/price.js';
import { ProductId } from '../../../../../app/domain/product/productId.js';
import { CartRepository } from '../cartRepository.js';
import { buildSetup } from './helper/cart.js';
import { testDb } from './helper/db.js';
import { truncateTables } from './helper/table.js';

describe('FindCartById', () => {
  const findCartById = CartRepository.findById(testDb);

  const customerId1 = CustomerId.generate();
  const customerId2 = CustomerId.generate();
  const customerId3 = CustomerId.generate();
  const productId1 = ProductId.generate();
  const productId2 = ProductId.generate();

  beforeAll(async () => {
    await truncateTables(testDb);
    const setup = buildSetup(testDb);
    await setup(productId1, productId2, customerId1, customerId2, customerId3);
  });

  afterAll(async () => {
    await truncateTables(testDb);
    await testDb.$client.end();
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
