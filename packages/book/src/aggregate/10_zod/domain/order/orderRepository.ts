import type { Order } from './order';

export interface OrderStorer {
  store(order: Order): Promise<Order>;
}
