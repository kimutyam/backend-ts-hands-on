import { eq } from 'drizzle-orm';

import type { Cart } from '../../../../app/domain/cart/cart.js';
import type { StoreCartEvent } from '../../../../app/port/secondary/db/cartEventStore.js';
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

const store =
  (db: Db): StoreCartEvent =>
  async (event, aggregate) => {
    await db.transaction(async (tx) => {
      const cartItemInserts = toCartItemInserts(aggregate);
      await tx.insert(domainEventTable).values(event);
      await tx
        .insert(cartTable)
        .values(toCartInsert(aggregate))
        .onConflictDoUpdate({
          target: [cartTable.customerId],
          set: {
            sequenceNumber: aggregate.sequenceNumber,
            updatedAt: new Date(),
          },
        });
      await tx
        .delete(cartItemTable)
        .where(eq(cartItemTable.customerId, aggregate.aggregateId));
      if (cartItemInserts.length > 0) {
        await tx.insert(cartItemTable).values(cartItemInserts);
      }
    });
  };

store.inject = [Db.token] as const;

const CartEventStore = {
  store,
} as const;

export { CartEventStore };
