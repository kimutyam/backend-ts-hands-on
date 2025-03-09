import type { CartEvent } from 'ch9/ex50/cartEvent.js';

interface CartEventStore<DE extends CartEvent> {
  (event: DE): Promise<void>;
}

export type { CartEventStore };
