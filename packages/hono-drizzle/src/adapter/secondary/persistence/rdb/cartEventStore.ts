import { eq } from 'drizzle-orm';
import { ResultAsync } from 'neverthrow';

import type { Cart } from '../../../../app/domain/cart/cart.js';
import { OptimisticLockError } from '../../../../app/domain/optimisticLockError.js';
import type { StoreCartEvent } from '../../../../app/port/secondary/persistence/cartEventStore.js';
import { Db } from './db.js';
import { cartTable } from './schema/cart.sql.js';
import { cartItemTable } from './schema/cartItem.sql.js';
import { domainEventTable } from './schema/domainEvent.sql.js';

type CartInsert = typeof cartTable.$inferInsert;
type CartItemInsert = typeof cartItemTable.$inferInsert;

const toCartInsert = (cart: Cart): CartInsert => ({
  customerId: cart.aggregateId,
  sequenceNumber: cart.sequenceNumber,
});

const toCartItemInserts = (cart: Cart): Array<CartItemInsert> =>
  cart.cartItems.map(({ productId, price, quantity }) => ({
    customerId: cart.aggregateId,
    productId,
    price,
    quantity,
  }));

const createStoreFn =
  (db: Db): StoreCartEvent =>
  (event, aggregate) => {
    const fn = async () => {
      await db.transaction(async (tx) => {
        const cartItemInserts = toCartItemInserts(aggregate);
        await tx.insert(domainEventTable).values(event);
        const result = await tx
          .insert(cartTable)
          .values(toCartInsert(aggregate))
          .onConflictDoUpdate({
            target: [cartTable.customerId],
            set: {
              sequenceNumber: aggregate.sequenceNumber,
              updatedAt: new Date(),
            },
            setWhere: eq(
              cartTable.sequenceNumber,
              aggregate.sequenceNumber - 1,
            ),
          });
        if (result.rowCount === 0) {
          throw new OptimisticLockError(event.aggregateName);
        }
        await tx
          .delete(cartItemTable)
          .where(eq(cartItemTable.customerId, aggregate.aggregateId));
        if (cartItemInserts.length > 0) {
          await tx.insert(cartItemTable).values(cartItemInserts);
        }
      });
    };
    return ResultAsync.fromSafePromise(fn());
  };

createStoreFn.inject = [Db.token] as const;

const CartEventStore = {
  createStoreFn,
} as const;

export { CartEventStore };
