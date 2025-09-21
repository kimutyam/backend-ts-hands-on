import type { Product } from '../../../../app/domain/product/product.js';
import type { ProductEvent } from '../../../../app/domain/product/productEvent.js';
import type { StoreProductEvent } from '../../../../app/port/secondary/db/productEventStore.js';
import { Db } from './db.js';
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
  async (event: ProductEvent, aggregate: Product) => {
    await db.transaction(async (tx) => {
      await tx.insert(domainEventTable).values(event);
      await tx
        .insert(productTable)
        .values(toProductInsert(aggregate))
        .onConflictDoUpdate({
          target: [productTable.productId],
          set: {
            sequenceNumber: aggregate.sequenceNumber,
            updatedAt: new Date(),
          },
        });
    });
  };

store.inject = [Db.token] as const;

const ProductEventStore = {
  store,
} as const;

export { ProductEventStore };
