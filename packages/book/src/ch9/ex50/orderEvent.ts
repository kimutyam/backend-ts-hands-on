import type { CartItem } from 'ch9/ex50/cartItem.js';
import type { CustomerId } from 'ch9/ex50/customerId.js';
import type { DomainEvent } from 'ch9/ex50/domainEvent.js';
import type { Order } from 'ch9/ex50/order.js';
import type { OrderId } from 'ch9/ex50/orderId.js';

const OrderRequested = {
  eventName: 'OrderRequested' as const,
} as const;

type OrderRequested = DomainEvent<
  OrderId,
  typeof Order.aggregateName,
  typeof OrderRequested.eventName,
  {
    customerId: CustomerId;
    items: ReadonlyArray<CartItem>;
  }
>;

type OrderEvent = OrderRequested;

export { type OrderEvent, OrderRequested };
