import type { Order } from 'aggregate/10_zod/domain/order/order.js';

export interface OrderStorer {
  store: (order: Order) => Promise<Order>;
}
