import type { CustomerId } from 'aggregate/10_zod/domain/customer/customerId.js';
import type { AggregateResolver } from 'aggregate/30_domain_event/domain/aggregateResolver.js';
import type { Cart } from 'aggregate/30_domain_event/domain/cart/cart.js';
import type { CartEvent } from 'aggregate/30_domain_event/domain/cart/cartEvent.js';
import type { CartNotFoundError } from 'aggregate/30_domain_event/domain/cart/cartNotFoundError.js';
import type { EventStore } from 'aggregate/30_domain_event/domain/eventStore.js';

export type CartResolver = AggregateResolver<
  CustomerId,
  Cart,
  CartNotFoundError
>;

export type CartEventStore = EventStore<Cart, CartEvent>;
