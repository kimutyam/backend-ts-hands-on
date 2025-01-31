import type { Order } from './order.js';

export interface OrderStorer {
  store: (order: Order) => Promise<Order>;
}
