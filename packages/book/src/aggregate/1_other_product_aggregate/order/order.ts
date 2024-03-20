import type { OrderId } from './orderId';
import type { OrderItem } from './orderItem';

export type Order = Readonly<{
  orderId: OrderId;
  orderItems: ReadonlyArray<OrderItem>;
}>;
