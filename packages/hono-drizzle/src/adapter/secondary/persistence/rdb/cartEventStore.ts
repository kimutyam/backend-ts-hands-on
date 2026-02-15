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
type Tx = Parameters<Parameters<Db['transaction']>[0]>[0];

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

const storeCart = async (
  tx: Tx,
  aggregate: Cart,
  aggregateName: string,
): Promise<void> => {
  const result = await tx
    .insert(cartTable)
    .values(toCartInsert(aggregate))
    .onConflictDoUpdate({
      target: [cartTable.customerId],
      set: {
        sequenceNumber: aggregate.sequenceNumber,
        updatedAt: new Date(),
      },
      setWhere: eq(cartTable.sequenceNumber, aggregate.sequenceNumber - 1),
    });
  if (result.rowCount === 0) {
    throw new OptimisticLockError(aggregateName);
  }
};

const storeCartItems = async (tx: Tx, aggregate: Cart): Promise<void> => {
  const cartItemInserts = toCartItemInserts(aggregate);
  await tx
    .delete(cartItemTable)
    .where(eq(cartItemTable.customerId, aggregate.aggregateId));
  if (cartItemInserts.length > 0) {
    await tx.insert(cartItemTable).values(cartItemInserts);
  }
};

const createStoreFn =
  (db: Db): StoreCartEvent =>
  (event, aggregate) => {
    const fn = async () => {
      await db.transaction(async (tx) => {
        await tx.insert(domainEventTable).values(event);
        await storeCart(tx, aggregate, event.aggregateName);
        await storeCartItems(tx, aggregate);
      });
    };
    return ResultAsync.fromSafePromise(fn());
  };

createStoreFn.inject = [Db.token] as const;

const CartEventStore = {
  createStoreFn,
} as const;

export { CartEventStore };
