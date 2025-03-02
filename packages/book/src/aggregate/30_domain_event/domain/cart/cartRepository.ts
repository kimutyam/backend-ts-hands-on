import type { CustomerId } from '../../../10_zod/domain/customer/customerId.js';
import type { AggregateResolver } from '../aggregateResolver.js';
import type { EventStore } from '../eventStore.js';
import type { Cart } from './cart.js';
import type { CartEvent } from './cartEvent.js';
import type { CartNotFoundError } from './cartNotFoundError.js';

export type CartResolver = AggregateResolver<
  CustomerId,
  Cart,
  CartNotFoundError
>;

export type CartEventStore = EventStore<Cart, CartEvent>;
