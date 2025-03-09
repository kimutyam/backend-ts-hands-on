import type { OrderEvent } from 'ch9/ex50/orderEvent.js';

interface OrderEventStore<DE extends OrderEvent> {
  (event: DE): Promise<void>;
}

export type { OrderEventStore };
