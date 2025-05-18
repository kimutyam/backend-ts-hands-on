import { eq } from 'drizzle-orm';

import type { Cart } from '../../../../domain/cart/cart.js';
import type { CartEvent } from '../../../../domain/cart/cartEvent.js';
import type { CartEventStore } from '../../../../domain/cart/cartEventStore.js';
import { Db } from '../db.js';
import { cartTable } from '../schema/cart.sql.js';
import { cartItemTable } from '../schema/cartItem.sql.js';
import { domainEventTable } from '../schema/domainEvent.sql.js';

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

const buildCartEventStore =
  (db: Db): CartEventStore<CartEvent> =>
  async (event: CartEvent, aggregate: Cart) => {
    await db.transaction(async (tx) => {
      const cartItemInserts = toCartItemInserts(aggregate);
      await tx
        .delete(cartTable)
        .where(eq(cartTable.customerId, aggregate.aggregateId));
      if (cartItemInserts.length > 0) {
        await tx.insert(cartTable).values(toCartInsert(aggregate));
        await tx.insert(cartItemTable).values(cartItemInserts);
      }
      await tx.insert(domainEventTable).values(event);
    });
  };

buildCartEventStore.inject = [Db.token] as const;

export { buildCartEventStore };
