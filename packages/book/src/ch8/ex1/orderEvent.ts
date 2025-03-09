import type { CartItem } from 'ch8/ex1/cartItem.js';
import type { CustomerId } from 'ch8/ex1/customerId.js';
import type { DomainEvent } from 'ch8/ex1/domainEvent.js';
import type { Order } from 'ch8/ex1/order.js';
import type { OrderId } from 'ch8/ex1/orderId.js';

const OrderRequested = {
  eventName: 'OrderRequested' as const,
} as const;

type OrderRequested = DomainEvent<
  OrderId,
  typeof Order.name,
  typeof OrderRequested.eventName,
  {
    customerId: CustomerId;
    items: ReadonlyArray<CartItem>;
  }
>;

type OrderEvent = OrderRequested;

export { type OrderEvent, OrderRequested };
