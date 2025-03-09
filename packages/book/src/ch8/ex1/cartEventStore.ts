import type { CartEvent } from 'ch8/ex1/cartEvent.js';

interface CartEventStore<DE extends CartEvent> {
  (event: DE): Promise<void>;
}

export type { CartEventStore };
