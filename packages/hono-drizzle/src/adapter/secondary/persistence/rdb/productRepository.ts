import { eq } from 'drizzle-orm';
import { err, ok, type Result, ResultAsync } from 'neverthrow';

import { Db } from '#/adapter/secondary/persistence/rdb/db.js';
import { productTable } from '#/adapter/secondary/persistence/rdb/schema/product.sql.js';
import { Product } from '#/app/domain/product/product.js';
import type { ProductId } from '#/app/domain/product/productId.js';
import { ProductNotFoundError } from '#/app/domain/product/productNotFoundError.js';
import type { FindProductById } from '#/app/port/secondary/persistence/productRepository.js';

type ProductSelect = typeof productTable.$inferSelect;

const validateExists =
  (aggregateId: ProductId) =>
  (selects: ReadonlyArray<ProductSelect>): Result<void, ProductNotFoundError> =>
    selects.length === 0
      ? err(ProductNotFoundError.create(aggregateId))
      : ok(undefined);

const validateUnique =
  (aggregateId: ProductId) =>
  (selects: ReadonlyArray<ProductSelect>): void => {
    if (selects.length > 1) {
      throw new Error(
        `商品IDでの索引で複数の商品が見つかりました: ${aggregateId}`,
      );
    }
  };

const toProduct = (selects: ReadonlyArray<ProductSelect>): Product => {
  const { productId, name, price, sequenceNumber } = selects[0]!;
  return Product.parse({
    aggregateId: productId,
    name,
    price,
    sequenceNumber,
  });
};

const createFindByIdFn =
  (db: Db): FindProductById =>
  (aggregateId) =>
    ResultAsync.fromSafePromise(
      db
        .select()
        .from(productTable)
        .where(eq(productTable.productId, aggregateId)),
    )
      .andThrough(validateExists(aggregateId))
      .andTee(validateUnique(aggregateId))
      .map(toProduct);

createFindByIdFn.inject = [Db.token] as const;

const ProductRepository = {
  createFindByIdFn,
} as const;

export { ProductRepository };
