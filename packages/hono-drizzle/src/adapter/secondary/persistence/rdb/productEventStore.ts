import { ResultAsync } from 'neverthrow';
import * as R from 'remeda';

import type { Product } from '../../../../app/domain/product/product.js';
import { ProductNameDuplicatedError } from '../../../../app/domain/product/productNameDuplicatedError.js';
import type { StoreProductEvent } from '../../../../app/port/secondary/persistence/productEventStore.js';
import { Db } from './db.js';
import { domainEventTable } from './schema/domainEvent.sql.js';
import { productTable } from './schema/product.sql.js';
import { isConstraintError } from './toConstraintError.js';

type ProductInsert = typeof productTable.$inferInsert;

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
    const fn = async () => {
      await db.transaction(async (tx) => {
        await tx.insert(productTable).values(toProductInsert(aggregate));
        await tx.insert(domainEventTable).values(event);
      });
    };
    const errorFn = (error: unknown): ProductNameDuplicatedError => {
      if (R.pipe(error, isConstraintError('product_name_unique'))) {
        return ProductNameDuplicatedError.create(
          aggregate.aggregateId,
          aggregate.name,
        );
      }
      throw error;
    };
    return ResultAsync.fromThrowable(fn, errorFn)();
  };

createStoreFn.inject = [Db.token] as const;

const ProductEventStore = {
  createStoreFn,
} as const;

export { ProductEventStore };
