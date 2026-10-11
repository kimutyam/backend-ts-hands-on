import type { Cart } from '#/app/domain/cart/cart.js';
import type { CartEvent } from '#/app/domain/cart/cartEvent.js';
import type { StoreEvent } from '#/app/port/secondary/persistence/eventStore.js';

type StoreCartEvent<DE extends CartEvent = CartEvent> = StoreEvent<Cart, DE>;

const StoreCartEvent = {
  token: 'CartEventStore',
} as const;

export { StoreCartEvent };
