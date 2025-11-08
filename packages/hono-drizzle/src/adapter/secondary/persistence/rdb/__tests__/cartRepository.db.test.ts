import assert from 'node:assert';

import { beforeAll, describe } from 'vitest';

import { Aggregate } from '../../../../../app/domain/aggregate.js';
import { Quantity } from '../../../../../app/domain/cart/quantity.js';
import { CustomerId } from '../../../../../app/domain/customer/customerId.js';
import { Price } from '../../../../../app/domain/product/price.js';
import { ProductId } from '../../../../../app/domain/product/productId.js';
import { CartRepository } from '../cartRepository.js';
import { cartTable } from '../schema/cart.sql.js';
import { cartItemTable } from '../schema/cartItem.sql.js';
import { TestDb } from './helper/db.js';
import { truncateTables } from './helper/table.js';

const setupWithCartItem = async (
  customerId: CustomerId,
  productId: ProductId,
) => {
  await TestDb.transaction(async (tx) => {
    await tx.insert(cartTable).values([
      {
        customerId,
        sequenceNumber: Aggregate.InitialSequenceNumber,
      },
    ]);
    await tx.insert(cartItemTable).values({
      customerId,
      productId,
      price: Price.parse(1_000),
      quantity: Quantity.parse(2),
    });
  });
};

const setupWithoutCartItem = async (customerId: CustomerId) => {
  await TestDb.insert(cartTable).values([
    {
      customerId,
      sequenceNumber: 5,
    },
  ]);
};

describe.sequential('FindCartById', () => {
  const findCartById = CartRepository.createFindByIdFn(TestDb);

  const customerId1 = CustomerId.generate();
  const customerId2 = CustomerId.generate();
  const customerId3 = CustomerId.generate();
  const productId1 = ProductId.generate();

  beforeAll(async () => {
    await truncateTables(TestDb);
    await setupWithCartItem(customerId1, productId1);
    await setupWithoutCartItem(customerId2);
  });

  afterAll(async () => {
    await truncateTables(TestDb);
    await TestDb.$client.end();
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
    expect(result.error.customerId).toBe(customerId3);
  });
});
