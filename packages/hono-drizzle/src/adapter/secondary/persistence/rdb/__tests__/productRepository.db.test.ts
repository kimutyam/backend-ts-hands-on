import assert from 'node:assert';

import { Price } from '../../../../../app/domain/product/price.js';
import { ProductId } from '../../../../../app/domain/product/productId.js';
import { ProductName } from '../../../../../app/domain/product/productName.js';
import type { Db } from '../db.js';
import { ProductRepository } from '../productRepository.js';
import { productTable } from '../schema/product.sql.js';
import { getDbInstanceFromEnv } from './helper/db.js';

const createSetupFn = (db: Db) => async (productId: ProductId) => {
  await db.transaction(async (tx) => {
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

const createTruncateTableFn = (db: Db) => async () => {
  await db.execute('TRUNCATE TABLE public.product');
};

describe.sequential('FindProductById', () => {
  const db = getDbInstanceFromEnv();
  const findProductById = ProductRepository.createFindByIdFn(db);
  const truncateTable = createTruncateTableFn(db);
  const setup = createSetupFn(db);
  const existsProductId = ProductId.generate();
  const notExistsProductId = ProductId.generate();

  beforeEach(async () => {
    await truncateTable();
    await setup(existsProductId);
  });

  afterAll(async () => {
    await truncateTable();
    await db.$client.end();
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
