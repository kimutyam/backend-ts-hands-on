import type { OrderEvent } from 'ch8/ex1/orderEvent.js';

interface OrderEventStore<DE extends OrderEvent> {
  (event: DE): Promise<void>;
}

export type { OrderEventStore };
