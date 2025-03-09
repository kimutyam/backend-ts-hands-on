import type { Order } from 'chx/ex10/domain/order/order.js';

export interface OrderStorer {
  store: (order: Order) => Promise<Order>;
}
