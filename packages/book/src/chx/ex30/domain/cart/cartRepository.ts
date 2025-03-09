import type { CustomerId } from 'chx/ex10/domain/customer/customerId.js';
import type { AggregateResolver } from 'chx/ex30/domain/aggregateResolver.js';
import type { Cart } from 'chx/ex30/domain/cart/cart.js';
import type { CartEvent } from 'chx/ex30/domain/cart/cartEvent.js';
import type { CartNotFoundError } from 'chx/ex30/domain/cart/cartNotFoundError.js';
import type { EventStore } from 'chx/ex30/domain/eventStore.js';

type CartResolver = AggregateResolver<CustomerId, Cart, CartNotFoundError>;

type CartEventStore = EventStore<Cart, CartEvent>;

export type { CartEventStore, CartResolver };
