import type { Cart } from '../../../domain/cart/cart.js';
import type { CartEvent } from '../../../domain/cart/cartEvent.js';

interface StoreCartEvent<DE extends CartEvent = CartEvent> {
  (event: DE, aggregate: Cart): Promise<void>;
}
const StoreCartEvent = {
  token: 'CartEventStore' as const,
} as const;

export { StoreCartEvent };
