import { eq } from 'drizzle-orm';

import type { Cart } from '../../../domain/cart/cart.js';
import type { CartEvent } from '../../../domain/cart/cartEvent.js';
import type { CartEventStore } from '../../../domain/cart/cartEventStore.js';
import { Db } from './db.js';
import { cartTable } from './schema/cart.sql.js';
import { cartItemTable } from './schema/cartItem.sql.js';
import { domainEventTable } from './schema/domainEvent.sql.js';

const toCartValues = (cart: Cart) => ({
  customerId: cart.aggregateId,
  sequenceNumber: cart.sequenceNumber,
});

const toCartItemValues = (cart: Cart) =>
  cart.cartItems.map((cartItem) => ({
    customerId: cart.aggregateId,
    productId: cartItem.productId,
    price: cartItem.price,
    quantity: cartItem.quantity,
  }));

const buildCartEventStore =
  (db: Db): CartEventStore<CartEvent> =>
  async (event: CartEvent, aggregate: Cart) => {
    await db.transaction(async (tx) => {
      const values = toCartItemValues(aggregate);
      await tx
        .delete(cartTable)
        .where(eq(cartTable.customerId, aggregate.aggregateId));
      if (values.length > 0) {
        await tx.insert(cartTable).values(toCartValues(aggregate));
        await tx.insert(cartItemTable).values(toCartItemValues(aggregate));
      }
      // payloadがunknownになってしまう
      if (event.eventName === 'CartItemAdded') {
        await tx.insert(domainEventTable).values(event);
      }
      await tx.insert(domainEventTable).values(event);
    });
  };

buildCartEventStore.inject = [Db.token] as const;

export { buildCartEventStore };
