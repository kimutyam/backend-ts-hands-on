import type { OrderId } from './orderId';
import type { OrderItem } from './orderItem';

export type Order = Readonly<{
  orderId: OrderId;
  customerId: CustomerId;
  orderItems: ReadonlyArray<OrderItem>;
}>;
