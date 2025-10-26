import type { Cart } from 'ch9/ex50/cart.js';
import type { CartEvent } from 'ch9/ex50/cartEvent.js';

interface CartEventStore<in DE extends CartEvent> {
  (event: DE, aggregate: Cart): Promise<void>;
}

export type { CartEventStore };
