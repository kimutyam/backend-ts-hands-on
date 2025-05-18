import type { Cart } from './cart.js';
import type { CartEvent } from './cartEvent.js';

interface CartEventStore<DE extends CartEvent> {
  (event: DE, aggregate: Cart): Promise<void>;
}
const CartEventStore = {
  token: 'CartEventStore' as const,
} as const;

export { CartEventStore };
