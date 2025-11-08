import type { OrderEvent } from './orderEvent.js';

interface OrderEventStore<DE extends OrderEvent> {
  (event: DE): Promise<void>;
}

export type { OrderEventStore };
