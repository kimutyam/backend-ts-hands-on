import type { OrderEvent } from '9_always_valid_domain_model/50/orderEvent.js';

interface OrderEventStore<DE extends OrderEvent> {
  (event: DE): Promise<void>;
}

export type { OrderEventStore };
