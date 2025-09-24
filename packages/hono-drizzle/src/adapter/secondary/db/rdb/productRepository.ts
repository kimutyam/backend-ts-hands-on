import { eq } from 'drizzle-orm';
import { err, ok, type Result, ResultAsync } from 'neverthrow';

import { Product } from '../../../../app/domain/product/product.js';
import type { ProductId } from '../../../../app/domain/product/productId.js';
import { ProductNotFoundError } from '../../../../app/domain/product/productNotFoundError.js';
import type { FindProductById } from '../../../../app/port/secondary/db/productRepository.js';
import { Db } from './db.js';
import { productTable } from './schema/product.sql.js';

type ProductSelect = typeof productTable.$inferSelect;

const toProduct =
  (aggregateId: ProductId) =>
  (
    selects: ReadonlyArray<ProductSelect>,
  ): Result<Product, ProductNotFoundError> => {
    if (selects.length === 0) {
      return err(new ProductNotFoundError(aggregateId));
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

const findById =
  (db: Db): FindProductById =>
  (aggregateId: ProductId) =>
    ResultAsync.fromSafePromise(
      db
        .select()
        .from(productTable)
        .where(eq(productTable.productId, aggregateId)),
    ).andThen(toProduct(aggregateId));

findById.inject = [Db.token] as const;

const ProductRepository = {
  findById,
} as const;

export { ProductRepository };
