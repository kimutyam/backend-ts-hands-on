import type { ResultAsync } from 'neverthrow';

import type { Cart } from '../../../domain/cart/cart.js';
import type { CartEvent } from '../../../domain/cart/cartEvent.js';

interface StoreCartEvent<in DE extends CartEvent = CartEvent> {
  (event: DE, aggregate: Cart): ResultAsync<void, never>;
}
const StoreCartEvent = {
  token: 'CartEventStore',
} as const;

export { StoreCartEvent };
