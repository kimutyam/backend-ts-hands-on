import type { StoreEvent } from './eventStore.js';
import type { Order } from './order.js';
import type { OrderEvent } from './orderEvent.js';

type StoreOrderEvent<DE extends OrderEvent = OrderEvent> = StoreEvent<
  Order,
  DE
>;

export type { StoreOrderEvent };
