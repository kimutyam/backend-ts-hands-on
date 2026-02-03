import type { Cart } from './cart.js';
import type { CartEvent } from './cartEvent.js';
import type { StoreEvent } from './eventStore.js';

type StoreCartEvent<DE extends CartEvent = CartEvent> = StoreEvent<Cart, DE>;

export type { StoreCartEvent };
