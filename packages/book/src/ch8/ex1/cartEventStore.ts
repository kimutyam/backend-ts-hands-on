import type { Cart } from 'ch8/ex1/cart.js';
import type { CartEvent } from 'ch8/ex1/cartEvent.js';

interface CartEventStore<DE extends CartEvent> {
  (event: DE, aggregate: Cart): Promise<void>;
}

export type { CartEventStore };
