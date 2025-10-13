import { eq } from 'drizzle-orm';
import { err, ok, type Result, ResultAsync } from 'neverthrow';

import { Product } from '../../../../app/domain/product/product.js';
import type { ProductId } from '../../../../app/domain/product/productId.js';
import { ProductNotFoundError } from '../../../../app/domain/product/productNotFoundError.js';
import type { FindProductById } from '../../../../app/port/secondary/persistence/productRepository.js';
import { Db } from './db.js';
import { productTable } from './schema/product.sql.js';

type ProductSelect = typeof productTable.$inferSelect;

const toProduct =
  (aggregateId: ProductId) =>
  (
    selects: ReadonlyArray<ProductSelect>,
  ): Result<Product, ProductNotFoundError> => {
    if (selects.length === 0) {
      return err(ProductNotFoundError.create(aggregateId));
    }

    const { name, price, sequenceNumber } = selects[0]!;

    return ok(
      Product.parse({
        aggregateId,
        name,
        price,
        sequenceNumber,
      }),
    );
  };

const createFindByIdFn =
  (db: Db): FindProductById =>
  (aggregateId) =>
    ResultAsync.fromSafePromise(
      db
        .select()
        .from(productTable)
        .where(eq(productTable.productId, aggregateId)),
    ).andThen(toProduct(aggregateId));

createFindByIdFn.inject = [Db.token] as const;

const ProductRepository = {
  createFindByIdFn,
} as const;

export { ProductRepository };
