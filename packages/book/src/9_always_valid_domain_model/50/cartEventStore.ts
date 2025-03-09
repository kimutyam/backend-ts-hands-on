import type { CartEvent } from '9_always_valid_domain_model/50/cartEvent.js';

interface CartEventStore<DE extends CartEvent> {
  (event: DE): Promise<void>;
}

export type { CartEventStore };
