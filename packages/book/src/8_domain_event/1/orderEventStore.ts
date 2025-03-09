import type { OrderEvent } from '8_domain_event/1/orderEvent.js';

interface OrderEventStore<DE extends OrderEvent> {
  (event: DE): Promise<void>;
}

export type { OrderEventStore };
