import assert from 'node:assert';

import { beforeAll, describe } from 'vitest';

import { Price } from '../../../../../app/domain/product/price.js';
import { ProductId } from '../../../../../app/domain/product/productId.js';
import { ProductName } from '../../../../../app/domain/product/productName.js';
import { ProductRepository } from '../productRepository.js';
import { productTable } from '../schema/product.sql.js';
import { TestDb } from './helper/db.js';
import { truncateTables } from './helper/table.js';

const setup = async (productId: ProductId) => {
  await TestDb.transaction(async (tx) => {
    await tx.insert(productTable).values([
      {
        productId,
        name: 'Test Product',
        price: 1000,
        sequenceNumber: 1,
      },
    ]);
  });
};

describe.sequential('FindProductById', () => {
  const findProductById = ProductRepository.createFindByIdFn(TestDb);

  const existsProductId = ProductId.generate();
  const notExistsProductId = ProductId.generate();

  beforeAll(async () => {
    await truncateTables(TestDb);
    await setup(existsProductId);
  });

  afterAll(async () => {
    await truncateTables(TestDb);
    await TestDb.$client.end();
  });

  it('登録済みの商品を索引できる', async () => {
    const result = await findProductById(existsProductId);
    assert(result.isOk());
    expect(result.value).toStrictEqual({
      aggregateId: existsProductId,
      sequenceNumber: 1,
      name: ProductName.parse('Test Product'),
      price: Price.parse(1000),
    });
  });

  it('商品が存在しない場合はエラーとなる', async () => {
    const result = await findProductById(notExistsProductId);
    assert(result.isErr());
    expect(result.error.productId).toBe(notExistsProductId);
  });
});
