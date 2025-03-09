import type { CartEvent } from '8_domain_event/1/cartEvent.js';

interface CartEventStore<DE extends CartEvent> {
  (event: DE): Promise<void>;
}

export type { CartEventStore };
