import type { CustomerId } from '../../../10_zod/domain/customer/customerId';
import type { AggregateResolver } from '../aggregateResolver';
import type { EventStore } from '../eventStore';
import type { Cart } from './cart';
import type { CartEvent } from './cartEvent';
import type { CartNotFoundError } from './cartNotFoundError';

export type CartResolver = AggregateResolver<CustomerId, Cart, CartNotFoundError>;

export type CartEventStore = EventStore<Cart, CartEvent>;
