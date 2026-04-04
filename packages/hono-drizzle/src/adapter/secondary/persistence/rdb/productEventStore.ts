import { ResultAsync } from 'neverthrow';
import * as R from 'remeda';

import { Db } from '#/adapter/secondary/persistence/rdb/db.js';
import { domainEventTable } from '#/adapter/secondary/persistence/rdb/schema/domainEvent.sql.js';
import { productTable } from '#/adapter/secondary/persistence/rdb/schema/product.sql.js';
import { isConstraintError } from '#/adapter/secondary/persistence/rdb/toConstraintError.js';
import type { Product } from '#/app/domain/product/product.js';
import { ProductNameDuplicatedError } from '#/app/domain/product/productNameDuplicatedError.js';
import type { StoreProductEvent } from '#/app/port/secondary/persistence/productEventStore.js';

type ProductInsert = typeof productTable.$inferInsert;

const toProductNameDuplicatedError =
  (aggregate: Product) =>
  (error: unknown): ProductNameDuplicatedError => {
    if (R.pipe(error, isConstraintError('product_name_unique'))) {
      return ProductNameDuplicatedError.create(
        aggregate.aggregateId,
        aggregate.name,
      );
    }
    throw error;
  };

const toProductInsert = (aggregate: Product): ProductInsert => {
  const { aggregateId, sequenceNumber, name, price } = aggregate;
  return {
    productId: aggregateId,
    sequenceNumber,
    name,
    price,
  };
};

const createStoreFn =
  (db: Db): StoreProductEvent =>
  (event, aggregate) => {
    const storeFn = async () => {
      await db.transaction(async (tx) => {
        await tx.insert(productTable).values(toProductInsert(aggregate));
        await tx.insert(domainEventTable).values(event);
      });
    };
    return ResultAsync.fromThrowable(
      storeFn,
      toProductNameDuplicatedError(aggregate),
    )();
  };

createStoreFn.inject = [Db.token] as const;

const ProductEventStore = {
  createStoreFn,
} as const;

export { ProductEventStore };
