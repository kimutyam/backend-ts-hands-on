import type { Cart } from '../../../domain/cart/cart.js';
import type { CartEvent } from '../../../domain/cart/cartEvent.js';
import type { StoreEvent } from './eventStore.js';

type StoreCartEvent<DE extends CartEvent = CartEvent> = StoreEvent<Cart, DE>;

const StoreCartEvent = {
  token: 'CartEventStore',
} as const;

export { StoreCartEvent };
