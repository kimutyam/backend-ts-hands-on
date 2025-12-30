import type { Cart } from './cart.js';
import type { CartEvent } from './cartEvent.js';

interface CartEventStore<in DE extends CartEvent> {
  (event: DE, aggregate: Cart): Promise<void>;
}

export type { CartEventStore };
