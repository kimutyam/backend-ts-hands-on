import assert from 'node:assert';

import { getDbInstanceFromEnv } from '#/adapter/secondary/persistence/rdb/__tests__/helper/db.js';
import type { Db } from '#/adapter/secondary/persistence/rdb/db.js';
import { ProductRepositoryOnRdb } from '#/adapter/secondary/persistence/rdb/productRepositoryOnRdb.js';
import { productTable } from '#/adapter/secondary/persistence/rdb/schema/product.sql.js';
import { Price } from '#/app/domain/product/price.js';
import { ProductId } from '#/app/domain/product/productId.js';
import { ProductName } from '#/app/domain/product/productName.js';

const createSetupFn =
  (db: Db) =>
  async (productId: ProductId): Promise<void> => {
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

const createTruncateTableFn = (db: Db) => async (): Promise<void> => {
  await db.execute('TRUNCATE TABLE product');
};

describe('FindProductById', () => {
  const db = getDbInstanceFromEnv();
  const findProductById = ProductRepositoryOnRdb.createFindByIdFn(db);
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

  it('複数の商品が見つかった場合は例外が送出される', async () => {
    const duplicatedProductId = ProductId.generate();
    const duplicatedProducts = [
      {
        productId: duplicatedProductId,
        name: 'Product 1',
        price: 1_000,
        sequenceNumber: 1,
      },
      {
        productId: duplicatedProductId,
        name: 'Product 2',
        price: 2_000,
        sequenceNumber: 1,
      },
    ];
    const dbWithDuplicatedProducts = {
      select: () => ({
        from: () => ({
          where: () => Promise.resolve(duplicatedProducts),
        }),
      }),
    } as unknown as Db;
    const findDuplicatedProductById = ProductRepositoryOnRdb.createFindByIdFn(
      dbWithDuplicatedProducts,
    );

    await expect(
      findDuplicatedProductById(duplicatedProductId),
    ).rejects.toThrow(
      `商品IDでの索引で複数の商品が見つかりました: ${duplicatedProductId}`,
    );
  });
});
