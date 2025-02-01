import type { CartEvent } from './cartEvent.js';

interface CartEventStore<DE extends CartEvent> {
  (event: DE): Promise<void>;
}

export type { CartEventStore };
