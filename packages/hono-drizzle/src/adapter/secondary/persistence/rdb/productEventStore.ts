import { ResultAsync } from 'neverthrow';

import type { Product } from '../../../../app/domain/product/product.js';
import { ProductNameDuplicatedError } from '../../../../app/domain/product/productNameDuplicatedError.js';
import type { StoreProductEvent } from '../../../../app/port/secondary/persistence/productEventStore.js';
import { Db } from './db.js';
import { toConstraintError } from './helper/toConstraintError.js';
import { domainEventTable } from './schema/domainEvent.sql.js';
import { productTable } from './schema/product.sql.js';

type ProductInsert = typeof productTable.$inferInsert;

const toProductInsert = (aggregate: Product): ProductInsert => ({
  productId: aggregate.aggregateId,
  sequenceNumber: aggregate.sequenceNumber,
  name: aggregate.name,
  price: aggregate.price,
});

const store =
  (db: Db): StoreProductEvent =>
  (event, aggregate) => {
    const fn = async () => {
      await db.transaction(async (tx) => {
        await tx.insert(domainEventTable).values(event);
        await tx.insert(productTable).values(toProductInsert(aggregate));
      });
    };
    const errorFn = toConstraintError('product_name_unique', () =>
      ProductNameDuplicatedError.create(aggregate.aggregateId, aggregate.name),
    );
    return ResultAsync.fromThrowable(fn, errorFn)();
  };

store.inject = [Db.token] as const;

const ProductEventStore = {
  store,
} as const;

export { ProductEventStore };
